'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const JS_FILES = require('./config/js.json');
const CONSTANTS = require('./config/constants.json');

const DIST = path.join(ROOT, 'dist');

function ensureDist() {
    if (!fs.existsSync(DIST)) {
        fs.mkdirSync(DIST, { recursive: true });
    }
}

function loadJs() {
    return JS_FILES
        .map((rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8'))
        .join('\n');
}

function inlineRawFiles(src) {
    return src.replace(/rawFile\(\s*(['"])([^'"]+)\1\s*\)/g, (_, _q, p) => {
        const content = fs.readFileSync(path.join(ROOT, p), 'utf8');
        return JSON.stringify(content);
    });
}

function stripNomangle(src) {
    let out = '';
    let i = 0;
    while (i < src.length) {
        const idx = src.indexOf('nomangle(', i);
        if (idx === -1) {
            out += src.slice(i);
            break;
        }
        out += src.slice(i, idx);
        let depth = 1;
        let j = idx + 'nomangle('.length;
        const inner = j;
        let inStr = null;
        let escape = false;
        while (j < src.length && depth > 0) {
            const c = src[j];
            if (escape) { escape = false; j++; continue; }
            if (inStr) {
                if (c === '\\') { escape = true; }
                else if (c === inStr) { inStr = null; }
            } else {
                if (c === '"' || c === "'" || c === '`') { inStr = c; }
                else if (c === '(') { depth++; }
                else if (c === ')') { depth--; if (depth === 0) break; }
            }
            j++;
        }
        out += src.slice(inner, j);
        i = j + 1;
    }
    return out;
}

const SKIP_KEYS = new Set(['true', 'false', 'null', 'const']);

function substituteConstants(src, constants) {
    let out = src;
    const keys = Object.keys(constants)
        .filter((k) => !SKIP_KEYS.has(k))
        .sort((a, b) => b.length - a.length);
    for (const key of keys) {
        const value = constants[key];
        const re = new RegExp('\\b' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
        out = out.replace(re, String(value));
    }
    return out;
}

function buildJs() {
    const constants = Object.assign({}, CONSTANTS);
    constants.DEBUG = 0;
    constants.LEVEL_WIDTH = constants.LEVEL_COLS * constants.CELL_SIZE;
    constants.LEVEL_HEIGHT = constants.LEVEL_ROWS * constants.CELL_SIZE;
    constants.TOWER_BASE_HEIGHT = (constants.CANVAS_HEIGHT - constants.LEVEL_HEIGHT) / 2;
    constants.LEVEL_X = constants.CANVAS_WIDTH / 2 - constants.LEVEL_COLS * constants.CELL_SIZE / 2;

    const runtimeShims = [
        'var optimizeMatrix = function(m){return m;};',
        'var evaluate = function(x){return x;};',
        ''
    ].join('\n');

    let src = loadJs();
    src = inlineRawFiles(src);
    src = stripNomangle(src);
    src = substituteConstants(src, constants);
    return runtimeShims + src;
}

function buildCss() {
    return fs.readFileSync(path.join(ROOT, 'src/style.css'), 'utf8');
}

function buildHtml(js, css) {
    const template = fs.readFileSync(path.join(ROOT, 'src/index.html'), 'utf8');
    return template
        .replace('{{{ CSS_INJECTION_SITE}}}', () => css)
        .replace('{{{ JS_INJECTION_SITE }}}', () => js);
}

function main() {
    ensureDist();
    const js = buildJs();
    const css = buildCss();
    const html = buildHtml(js, css);
    const outPath = path.join(DIST, 'index.html');
    fs.writeFileSync(outPath, html);
    const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
    console.log(`Built ${outPath} (${sizeKb} KB)`);
}

main();
