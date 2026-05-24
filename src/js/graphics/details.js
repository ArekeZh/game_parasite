UNPADDED_WINDOW = createCanvas(
    CELL_SIZE * 0.8,
    CELL_SIZE * 1.2,
    (c, can) => {
        c.fs('#1a1814');
        c.fr(0, 0, can.width, can.height);

        c.strokeStyle = '#4a4540';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(can.width * 0.1, can.height * 0.15);
        c.lineTo(can.width * 0.9, can.height * 0.85);
        c.moveTo(can.width * 0.5, can.height * 0.1);
        c.lineTo(can.width * 0.2, can.height * 0.9);
        c.stroke();

        c.fs('#5a5048');
        c.fr(0, 0, can.width, 2);
        c.fr(0, can.height - 2, can.width, 2);
        c.fr(0, 0, 2, can.height * 0.4);
        c.fr(can.width - 2, can.height * 0.55, 2, can.height * 0.45);
    }
);

WINDOW = padCanvas(2, 1, 0.5, UNPADDED_WINDOW);

UNPADDED_DESK = createCanvas(CELL_SIZE * 1.1, CELL_SIZE * 0.5, (c, can) => {
    // Legs
    c.fs('#000');
    c.fr(2, 0, 2, can.height);
    c.fr(can.width - 2, 0, -2, can.height);

    // Top
    c.fs('#3a342e');
    c.fr(0, 0, 99, 4);

    // Drawers
    c.fs('#5a5048');
    c.fr(4, 4, can.width / 4, can.height / 3);
    c.fr(can.width - 4, 4, -can.width / 4, can.height / 3);
});

COMPUTER = createCanvas(CELL_SIZE * 0.6, CELL_SIZE * 0.6, (c, can) => {
    c.fs('#000');
    c.fr(0, 0, 99, 99);

    c.fs('#a9a9a9');
    c.fr(2, 2, can.width - 4, can.height - 4);

    c.fs('#4253ff');
    c.fr(4, 4, can.width - 8, can.height - 12);

    c.fs('#000');
    c.fr(4, can.height - 6, can.width - 8, 2);

    c.fs('#a5dc40');
    c.fr(can.width - 6, can.height - 6, 2, 2);
});

FRAME = padCanvas(1, 1, 0.5, createCanvas(CELL_SIZE * 0.6, CELL_SIZE * 0.8, (c, can) => {
    c.fs('#4a3a28');
    c.fr(0, 0, can.width, can.height * 0.85);
    c.fr(can.width * 0.7, 0, can.width * 0.3, can.height * 0.4);

    c.fs('#2a2018');
    c.fr(4, 4, can.width - 8, can.height - 12);

    c.strokeStyle = '#1a1410';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(4, can.height * 0.3);
    c.lineTo(can.width - 4, can.height * 0.7);
    c.stroke();
}));

DESK = padCanvas(1, 2, 1, UNPADDED_DESK);

TRASH = padCanvas(1, 1, 1, createCanvas(CELL_SIZE * 0.3, CELL_SIZE * 0.4, (c, can) => {
    c.fs('#4c80be');
    c.fr(0, 0, 99, 99);

    c.fs('#78a1d6');
    c.fr(0, 0, 99, 4);
}));

OUTLET = padCanvas(1, 1, 0.75, createCanvas(CELL_SIZE * 0.2, CELL_SIZE * 0.2, (c, can) => {
    c.fs('#fff');
    c.fr(0, 0, 99, 99);
}));

LIGHT = padCanvas(3, 10, 0, createCanvas(CELL_SIZE * 5, CELL_SIZE * 3, (c, can) => {
    const g = c.createRadialGradient(can.width / 2, 0, 0, can.width / 2, 0, can.height);
    g.addColorStop(0, 'rgba(180, 160, 120, 0.08)');
    g.addColorStop(1, 'rgba(180, 160, 120, 0)');
    c.fs(g);

    c.beginPath();
    c.moveTo(can.width / 2, 0);
    c.arc(can.width / 2, 0, can.height, PI / 6, PI * 5 / 6, false);
    c.fill();
}));
