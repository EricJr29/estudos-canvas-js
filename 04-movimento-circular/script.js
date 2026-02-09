const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};

const colors = ['#36BFB1', '#038C73', '#02735E', '#014034'];

// Evento para aumentar a velocidade dos partículas ao clicar (pressionar o botão do mouse)
addEventListener('mousedown', () => {
    particles.forEach(particle => {
        particle.velocity += .09; // Incrementa a velocidade dos partículas
    });
});

// Evento para restaurar a velocidade padrão ao soltar o mouse
addEventListener('mouseup', () => {
    particles.forEach(particle => {
        particle.velocity = 0.03; // Retorna a velocidade ao valor inicial
    });
});

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth; 
    canvas.height = innerHeight; 
    init();
});

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2; // Ângulo inicial aleatório
    this.velocity = 0.03; // Velocidade inicial dos partículas
    this.distanceFromCenter = randomIntFromRange(80, 300); // Distância aleatória do centro
    this.lastMousePosition = { x: x, y: y }; // Última posição do mouse

    // Função para atualizar a posição e desenhar a linha
    this.update = () => {
        const lastPoint = { x: this.x, y: this.y }; // Ponto anterior para desenhar

        // Atualiza a posição em direção ao mouse com suavização
        this.lastMousePosition.x += (mouse.x - this.lastMousePosition.x) * 0.05;
        this.lastMousePosition.y += (mouse.y - this.lastMousePosition.y) * 0.05;

        this.radians += this.velocity; // Atualiza o ângulo baseado na velocidade
        this.x =
            this.lastMousePosition.x +
            Math.cos(this.radians) * this.distanceFromCenter; // Calcula nova posição X
        this.y =
            this.lastMousePosition.y +
            Math.sin(this.radians) * this.distanceFromCenter; // Calcula nova posição Y

        this.draw(lastPoint); // Chama a função de desenho
    };

    // Função para desenhar linhas entre partículas
    this.draw = (lastPoint) => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y); // Ponto inicial
        c.lineTo(this.x, this.y); // Ponto final
        c.stroke();
        c.closePath();
    };
}

let particles;

function init() {
    particles = [];

    for (let i = 0; i < 200; i++) { 
        const radius = Math.random() * 2 + 1; // Define um raio aleatório entre 1 e 3
        const color = randomColor(colors); 
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate); 
    c.fillStyle = 'rgba(255, 255, 255, 0.05)'; 
    c.fillRect(0, 0, canvas.width, canvas.height); 

    particles.forEach((particle) => {
        particle.update(); 
    });
}

init();
animate();
