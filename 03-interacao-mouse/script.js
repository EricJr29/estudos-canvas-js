var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var maxR = 40; // Tamanho máximo do raio dos círculos (nova funcionalidade)
var minR = 4;  // Tamanho mínimo do raio dos círculos (nova funcionalidade)

// Paleta de cores para os círculos (nova funcionalidade)
var colorArray = [
    '#012340',
    '#025939',
    '#027333',
    '#03A63C',
    '#04D939'
];

var mouse = {
    x: undefined, // Coordenada X do mouse (usada na interação)
    y: undefined, // Coordenada Y do mouse (usada na interação)
};

// Adiciona evento de movimento do mouse para atualizar as coordenadas (nova funcionalidade)
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Evento para ajustar o canvas ao redimensionar a janela (nova funcionalidade)
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Recria os círculos para ajustar ao novo tamanho do canvas
});

function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.minR = r; // Armazena o tamanho inicial do círculo para retornar ao valor mínimo
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]; // Define uma cor aleatória da paleta

    this.draw = function () {
        c.beginPath();
        c.fillStyle = this.color; // Usa a cor definida para o círculo
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fill();
    };

    this.update = function () {
        if (this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Interação com o mouse: aumenta o raio se o círculo estiver próximo ao mouse (nova funcionalidade)
        if (
            mouse.x - this.x < 60 && mouse.x - this.x > -60 &&
            mouse.y - this.y < 60 && mouse.y - this.y > -60 &&
            this.r < maxR
        ) {
            this.r += 1;
        } else if (this.r > minR) {
            this.r -= 1; // Reduz o raio quando não está próximo ao mouse
        }

        this.draw();
    };
}

var CircleArray = [];

function init() {
    CircleArray = []; // Reinicializa o array de círculos (nova funcionalidade para redimensionamento)
    for (var i = 0; i < 1000; i++) { // Aumentado de 100 para 1000 círculos (nova quantidade)
        var r = Math.random() * 3 + 1; // Círculos agora começam com raios pequenos e aleatórios
        var x = Math.random() * (innerWidth - r * 2) + r;
        var y = Math.random() * (innerHeight - r * 2) + r;
        var dx = (Math.random() - 0.5) * 6; // Reduzida a velocidade inicial para suavizar o movimento
        var dy = (Math.random() - 0.5) * 6;
        CircleArray.push(new Circle(x, y, dx, dy, r));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight); // Limpa o canvas em cada frame
    for (var i = 0; i < CircleArray.length; i++) {
        CircleArray[i].update();
    }
}

init(); // Chama a função de inicialização para criar os círculos
animate(); // Inicia a animação
