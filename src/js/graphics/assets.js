drawDecayedWindow = (c, x, y, w, h, rng) => {
    const variant = ~~rng.between(0, 5);

    if (variant === 0) {
        return;
    }

    if (variant === 1) {
        c.fs('#0c0a08');
        c.fr(x, y, w, h);
        c.fs('#4a4038');
        c.fr(x, y, w * 0.35, 2);
        c.fr(x + w * 0.55, y + h - 3, w * 0.4, 2);
        return;
    }

    if (variant === 2) {
        c.fs('#1a1510');
        c.fr(x, y, w, h);
        c.fs('#3a2e22');
        c.fr(x + 1, y + h * 0.15, w - 2, 3);
        c.fr(x + 1, y + h * 0.45, w - 2, 3);
        c.fr(x + 1, y + h * 0.72, w - 2, 3);
        return;
    }

    c.fs('#141210');
    c.fr(x, y, w, h);

    c.strokeStyle = '#3a3530';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(x + w * 0.15, y + h * 0.2);
    c.lineTo(x + w * 0.85, y + h * 0.75);
    c.moveTo(x + w * 0.55, y + h * 0.15);
    c.lineTo(x + w * 0.25, y + h * 0.85);
    c.stroke();

    if (variant === 4) {
        c.fs('#2a2218');
        c.fr(x + w * 0.3, y + h * 0.35, w * 0.15, h * 0.2);
        c.fr(x + w * 0.6, y + h * 0.5, w * 0.12, h * 0.15);
    }
};

GOD_RAY = createCanvas(evaluate(CELL_SIZE * 0.6), evaluate(CELL_SIZE * 4), (c, can) => {
    const g = c.createLinearGradient(0, 0, 0, CELL_SIZE * 4);
    g.addColorStop(0, 'rgba(180, 170, 150, 0)');
    g.addColorStop(0.5, 'rgba(120, 110, 95, 0.15)');
    g.addColorStop(1, 'rgba(180, 170, 150, 0)');

    c.fs(g);
    c.fr(0, 0, 99, 999);
});

HALO = createCanvas(evaluate(CELL_SIZE * 4), evaluate(CELL_SIZE * 4), (c, can) => {
    const g = c.createRadialGradient(can.width / 2, can.height / 2, 0, can.width / 2, can.height / 2, can.width / 2);
    g.addColorStop(0.5, 'rgba(255,255,255, 0.5)');
    g.addColorStop(1, 'rgba(255,255,255, 0)');

    c.fs(g);
    c.fr(0, 0, 999, 999);
});

RED_HALO = createCanvas(evaluate(CELL_SIZE * 6), evaluate(CELL_SIZE * 6), (c, can) => {
    const g = c.createRadialGradient(
        can.width / 2, can.height / 2, 0,
        can.width / 2, can.height / 2, can.width / 2
    );
    g.addColorStop(0.5, 'rgba(46, 230, 200, 0.45)');
    g.addColorStop(1, 'rgba(46, 230, 200, 0)');

    c.fs(g);
    c.fr(0, 0, 999, 999);
});

WINDOW_PATTERN = createCanvasPattern(evaluate(CELL_SIZE * 2), evaluate(CELL_SIZE * 2), (c, can) => {
    c.fs('#2a5a68');
    c.fr(0, 0, 999, 999);

    c.fs('#142830');
    c.fr(can.width / 10, can.height / 4, can.width * 8 / 10, can.height / 2);
});

BUILDING_PATTERN = createCanvasPattern(evaluate(CELL_SIZE * LEVEL_COLS), evaluate(CELL_SIZE * 10), (c, can) => {
    c.fs('#1a3038');
    c.fr(0, 0, can.width, 999);
});

SIGN_HOLDER_PATTERN = createCanvasPattern(evaluate(CELL_SIZE * 2), evaluate(CELL_SIZE * 2), (c, can) => {
    c.fillStyle = c.strokeStyle = '#1a3530';
    c.lineWidth = 4;

    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(can.width * 0.35, 0);
    c.moveTo(can.width, 0);
    c.lineTo(can.width * 0.6, 0);
    c.moveTo(0, can.height);
    c.lineTo(can.width * 0.25, can.height);
    c.stroke();

    c.fs('#3a2818');
    c.fr(can.width * 0.1, can.height * 0.15, can.width * 0.3, can.height * 0.2);
    c.fr(can.width * 0.55, 0, can.width * 0.25, can.height * 0.15);

    c.strokeStyle = '#2a2018';
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(can.width * 0.2, can.height * 0.3);
    c.lineTo(can.width * 0.85, can.height * 0.85);
    c.stroke();
});

ROOFTOP_RUBBLE = createCanvasPattern(evaluate(CELL_SIZE * 4), evaluate(CELL_SIZE * 2), (c, can) => {
    const rng = createNumberGenerator(31);

    c.fs('#1a1612');
    c.fr(0, 0, can.width, can.height);

    for (let i = 0; i < 10; i++) {
        c.fs(rng.floating() > 0.4 ? '#3a3530' : '#2a2520');
        c.fr(
            rng.between(0, can.width - 20),
            rng.between(0, can.height - 8),
            rng.between(8, 28),
            rng.between(4, 12)
        );
    }

    c.strokeStyle = '#12100e';
    c.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
        c.beginPath();
        c.moveTo(rng.between(0, can.width), can.height);
        c.lineTo(rng.between(0, can.width), rng.between(0, can.height * 0.5));
        c.stroke();
    }
});

renderMobileArrow = () => {
    beginPath();
    moveTo(MOBILE_BUTTON_SIZE / 2, 0);
    lineTo(-MOBILE_BUTTON_SIZE / 2, MOBILE_BUTTON_SIZE / 2);
    lineTo(-MOBILE_BUTTON_SIZE / 2, -MOBILE_BUTTON_SIZE / 2);
    fill();
};
