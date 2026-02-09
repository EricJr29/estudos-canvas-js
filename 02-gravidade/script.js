const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Rastrear a posição do mouse
const mouse = {
    x: innerWidth / 2, // Inicialmente no centro da tela (X)
    y: innerHeight / 2 // Inicialmente no centro da tela (Y)
};

// Função utilitária: Gera um número aleatório entre 'min' e 'max'
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Função utilitária: Seleciona uma cor aleatória do array 'colors'
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

const colors = ['#FFF132', '#B30032', '#FF7DA1', '#4FAECC', '#0088B3'];

// Configurações físicas
let gravity = 1; // Gravidade para simular queda
let friction = 0.95; // Atrito para reduzir a velocidade após colisões

// Reinicia as bolas ao clicar
addEventListener('click', () => {
    init(); // Recria todas as bolas
});

// Ajusta o canvas ao redimensionar a janela e reinicia o estado
addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init(); // Recria todas as bolas
});

// Classe que representa uma bola
class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x; // Posição X
        this.y = y; // Posição Y
        this.dx = dx; // Velocidade horizontal
        this.dy = dy; // Velocidade vertical
        this.radius = radius; // Tamanho da bola
        this.color = color; // Cor da bola
    }

    // Desenha a bola no canvas
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
        c.closePath();
    }

    // Atualiza a posição e comportamento da bola
    update() {
        // Detecta colisão com o chão e aplica atrito
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction; // Inverte a direção e reduz a velocidade
        } else {
            this.dy += gravity; // Aplica gravidade
        }

        // Detecta colisão com as laterais do canvas e aplica atrito
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx * friction; // Inverte a direção horizontal
        }

        // Atualiza a posição da bola
        this.x += this.dx;
        this.y += this.dy;

        // Desenha a bola atualizada
        this.draw();
    }
}

// Array para armazenar todas as bolas
let ballArray = [];

// Inicializa as bolas com posições, velocidades e tamanhos aleatórios
function init() {
    ballArray = []; // Limpa o array antes de recriar

    for (let i = 0; i < 500; i++) { 
        const radius = randomIntFromRange(20, 40); // Tamanho aleatório
        const x = randomIntFromRange(radius, canvas.width - radius); // Posição X inicial
        const y = randomIntFromRange(radius, canvas.height - radius); // Posição Y inicial
        const dx = randomIntFromRange(-5, 5) || 1; // Velocidade horizontal
        const dy = randomIntFromRange(-5, 5) || 1; // Velocidade vertical
        const color = randomColor(colors); // Cor aleatória

        // Adiciona uma nova bola ao array
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

// Loop de animação: Atualiza a tela continuamente
function animate() {
    requestAnimationFrame(animate); // Chama o loop recursivamente
    c.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    // Atualiza e desenha cada bola no array
    ballArray.forEach(ball => ball.update());
}

// Inicializa as bolas e inicia a animação
init();
animate();
