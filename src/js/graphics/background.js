BUILDINGS_BACKGROUND = [
    ['#060c10', 600],
    ['#0e1820', 500],
    ['#162830', 300]
].map(([color, patternHeight], layerIndex) => createCanvasPattern(400, patternHeight, (c, can) => {
    c.fs(color);

    const rng = createNumberGenerator(patternHeight * 5 + layerIndex * 13);

    let x = 0;
    while (x < can.width) {
        const buildingWidth = ~~rng.between(70, 130);
        const buildingTop = ~~rng.between(0, 180);
        const buildingHeight = patternHeight - buildingTop;

        c.fs(color);
        c.fr(x, buildingTop, buildingWidth, buildingHeight);

        for (let j = 0; j < ~~rng.between(2, 6); j++) {
            c.fs('#050a10');
            c.fr(
                x + rng.between(4, buildingWidth - 16),
                buildingTop,
                rng.between(10, 24),
                rng.between(12, 45)
            );
        }

        if (rng.floating() > 0.45) {
            c.fs('#050a10');
            c.fr(
                x + rng.between(8, buildingWidth - 28),
                buildingTop + rng.between(40, buildingHeight - 60),
                rng.between(14, 36),
                rng.between(25, 70)
            );
        }

        if (rng.floating() > 0.55) {
            c.strokeStyle = '#0a1018';
            c.lineWidth = 1;
            c.beginPath();
            c.moveTo(x + buildingWidth * 0.2, buildingTop + buildingHeight * 0.3);
            c.lineTo(x + buildingWidth * 0.7, buildingTop + buildingHeight * 0.8);
            c.stroke();
        }

        x += buildingWidth - ~~rng.between(0, 8);
    }
}));

SKY_BACKGROUND = createCanvas(1, CANVAS_HEIGHT, (c) => {
    const gradient = c.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#050a12');
    gradient.addColorStop(0.45, '#0c1a28');
    gradient.addColorStop(1, '#143040');
    return gradient;
});
