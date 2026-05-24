# Паразит

<img src="/assets/main-menu-1600x800.png" width="400"> <img src="/assets/gameplay-1-1600x800.png" width="400">

**Паразит** — стелс-платформер в духе Super Meat Boy и Stealth Bastard Deluxe.
Цель — забраться на башню, найти секретные данные и не попасться на глаза охране.

Уровни рассчитаны на простые и сложные маршруты; есть таймер для спидрана.

## Getting started

```sh
npm install
npm run build
npm run dev
```

`npm run build` produces `dist/index.html`. `npm run dev` builds and serves it on a local web server.

## Testing

Set `DEBUG = 1` in `build.js` (or run with `DEBUG=1 node build.js` once wired up) to enable the test helpers below. You can then run commands in the browser's console.

### Time control

Press <kbd>F</kbd> to speed up the game, <kbd>G</kbd> to slow it down.

### Skip level

Press <kbd>N</kbd>.

### In-game level editor

A simple level editor allows you to modify the obstacles while in-game.

```javascript
setDebugValue('editor', true)
```

### Show grid

Press <kbd>T</kbd> while in game to show the grid.

### Set default level

```javascript
setDebugValue('level', levelIndex)
```

### Become invisible

```javascript
setDebugValue('invisible', true)
```
