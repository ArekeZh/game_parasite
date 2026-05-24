const legLength = 6;
const visualRadius = PLAYER_RADIUS + 2;
const bodyWidth = visualRadius * 2 - 8;
const bodyHeight = visualRadius * 2 - 4;

createCharacterBody = instructions => createCanvas(bodyWidth, bodyHeight + legLength, (c, can) => {
    c.fs('#000');

    c.beginPath();
    c.roundedRectangle(
        0,
        0,
        can.width,
        bodyHeight,
        6
    );
    c.fill();

    c.globalCompositeOperation = nomangle('source-atop');

    instructions(c, can);
});

PLAYER_BODY = createCanvas(bodyWidth, bodyHeight + legLength, (c, can) => {
    const cx = can.width / 2;
    const cy = bodyHeight / 2;

    // Outer membrane
    c.fs('#4a1f48');
    c.beginPath();
    c.ellipse(cx, cy, can.width / 2 - 1, bodyHeight / 2 - 1, 0, 0, PI * 2);
    c.fill();

    // Inner flesh
    c.fs('#8a3a72');
    c.beginPath();
    c.ellipse(cx, cy + 2, can.width / 2 - 5, bodyHeight / 2 - 5, 0, 0, PI * 2);
    c.fill();

    // Segments
    c.fs('#3a1538');
    for (let i = 1; i < 4; i++) {
        c.fr(3, i * (bodyHeight / 4), can.width - 6, 2);
    }

    // Bioluminescent spots
    c.fs('#2ee6c8');
    c.globalAlpha = 0.55;
    [[cx - 5, cy - 3, 2.5], [cx + 4, cy + 2, 2], [cx, cy + 6, 1.5]].forEach(([x, y, r]) => {
        c.beginPath();
        c.arc(x, y, r, 0, PI * 2);
        c.fill();
    });
    c.globalAlpha = 1;

    // Dorsal ridge
    c.beginPath();
    c.moveTo(cx, 3);
    c.quadraticCurveTo(cx + 3, cy, cx, bodyHeight - 3);
    c.lineWidth = 2;
    c.strokeStyle = '#2a0f28';
    c.stroke();
});

GUARD_BODY = createCharacterBody((c, can) => {
    // Shirt
    c.fs('#3a4f5c');
    c.fr(0, 0, 99, 99);

    // Skin
    c.fs('#daab79');
    c.fr(0, 0, 99, 14);

    // Pants
    c.fs('#0a1820');
    c.fr(0, 25, 99, 99);

    // Tie
    c.fs('#2ee6c8');
    c.fr(bodyWidth - 6, 14, 2, 10);
});

renderCharacter = (
    context,
    clock,
    body,
    legs,
    facing,
    walking,
    jumpRatio
) => {
    context.scale(facing, 1);

    wrap(() => {
        // Bobbing
        if (walking) {
            context.rotate(
                sin(clock * PI * 2 / 0.25) * PI / 32
            );
        }

        // Flip animation
        context.rotate(jumpRatio * PI * 2);

        context.translate(-body.width / 2, -body.height / 2);
        context.drawImage(body, 0, 0);

        if (body === PLAYER_BODY) {
            renderParasiteEyes(context, clock);
        } else {
            renderEyes(context, clock);
        }
    });

    if (legs) {
        if (body === PLAYER_BODY) {
            renderParasiteTentacles(context, clock, walking);
        } else {
            renderLegs(context, clock, walking);
        }
    }
};

renderEyes = (context, clock) => {
    context.fs('#000');

    const moduloTime = clock % BLINK_INTERVAL;
    const middleBlinkTime = evaluate(BLINK_INTERVAL - BLINK_TIME / 2);
    const eyeScale = min(1, max(-moduloTime + middleBlinkTime, moduloTime - middleBlinkTime) / (BLINK_TIME / 2));

    context.fr(bodyWidth - 1, 7, -4, 4 * eyeScale);
    context.fr(bodyWidth - 8, 7, -4, 4 * eyeScale);
};

renderParasiteEyes = (context, clock) => {
    const cx = bodyWidth / 2;
    const cy = bodyHeight / 2 - 1;
    const pulse = sin(clock * PI * 2) * 0.15 + 1;

    context.fs('#b8ff60');
    context.beginPath();
    context.ellipse(cx, cy, 5 * pulse, 7 * pulse, 0, 0, PI * 2);
    context.fill();

    context.fs('#1a1020');
    context.beginPath();
    context.ellipse(cx, cy, 1.5, 4 * pulse, 0, 0, PI * 2);
    context.fill();

    context.fs('#2ee6c8');
    context.globalAlpha = 0.4 + sin(clock * PI * 4) * 0.2;
    context.beginPath();
    context.arc(cx - 2, cy - 2, 1.5, 0, PI * 2);
    context.fill();
    context.globalAlpha = 1;
};

renderLegs = (context, clock, walking) => {
    context.fs('#000');

    const legLengthRatio = sin(clock * PI * 2 / 0.25) * 0.5 + 0.5;
    const leftRatio = walking ? legLengthRatio : 1
    const rightRatio = walking ? 1 - legLengthRatio : 1;
    context.fr(-8, visualRadius - legLength, 4, leftRatio * legLength);
    context.fr(8, visualRadius - legLength, -4, rightRatio * legLength);
};

renderParasiteTentacles = (context, clock, walking) => {
    const wave = sin(clock * PI * 2 / 0.25);
    const baseY = visualRadius - 2;

    [
        [-7, wave],
        [0, -wave],
        [7, wave * 0.7]
    ].forEach(([x, wobble], i) => {
        const len = walking ? legLength + wobble * 3 : legLength + 1;
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.strokeStyle = i === 1 ? '#6a2a62' : '#5a2048';
        context.beginPath();
        context.moveTo(x, baseY);
        context.quadraticCurveTo(
            x + wobble * 2,
            baseY + len * 0.5,
            x + wobble,
            baseY + len
        );
        context.stroke();
    });
};

renderParasiteTail = (context, characterPosition, tailTrail) => {
    if (!tailTrail.length) {
        return;
    }

    R.lineJoin = 'round';
    R.lineCap = 'round';

  const drawTailLayer = (width, color, alpha) => {
        R.globalAlpha = alpha;
        R.lineWidth = width;
        R.strokeStyle = color;
        beginPath();
        moveTo(characterPosition.x, characterPosition.y);

        let remainingLength = MAX_BANDANA_LENGTH;

        for (let i = 0; i < tailTrail.length && remainingLength > 0; i++) {
            const current = tailTrail[i];
            const previous = tailTrail[i - 1] || characterPosition;

            const actualDistance = dist(current, previous);
            const renderedDist = min(actualDistance, remainingLength);
            remainingLength -= renderedDist;
            const ratio = renderedDist / actualDistance;

            lineTo(
                previous.x + ratio * (current.x - previous.x),
                previous.y + ratio * (current.y - previous.y)
            );
        }
        stroke();
    };

    drawTailLayer(12, '#4a1f48', 0.9);
    drawTailLayer(6, '#a8558a', 0.85);
    drawTailLayer(2, '#2ee6c8', 0.5);

    R.globalAlpha = 1;
};

renderBandana = renderParasiteTail;
