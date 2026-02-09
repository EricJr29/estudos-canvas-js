const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const wave = {
    y: canvas.height / 2,
    length: 0.01,
    amplitude: 120,
    frequency: 0.01,
};

const strokeColor = {
    h: 200,
    s: 50,
    l: 50,
};

let increment = 0;

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.01)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.beginPath();
    c.moveTo(0, wave.y);

    for (let i = 0; i < canvas.width; i++) {
        const y =
            wave.y +
            Math.sin(i * wave.length + increment) *
            wave.amplitude *
            Math.sin(increment);
        c.lineTo(i, y);
    }

    c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${strokeColor.s}%, ${strokeColor.l}%)`;
    c.lineWidth = 3;
    c.stroke();

    increment += wave.frequency;
}

animate();
