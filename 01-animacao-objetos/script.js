var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// Função para criar objetos 'Circle'
function Circle(x, y, dx, dy, r) {
    this.x = x;        // Posição inicial no eixo X
    this.y = y;        // Posição inicial no eixo Y
    this.dx = dx;      // Velocidade no eixo X
    this.dy = dy;      // Velocidade no eixo Y
    this.r = r;        // Raio do círculo

    // Método para desenhar o círculo
    this.draw = function () {
        c.beginPath();  
        c.strokeStyle = 'black'; 
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fill();
        c.stroke();
    }

    // Método para atualizar a posição do círculo
    this.update = function () {
        // Verifica colisão com as bordas do canvas e inverte a direção se necessário
        if (this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;  // Inverte a direção no eixo X
        }
        if (this.y + this.r > innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;  // Inverte a direção no eixo Y
        }

        this.x += this.dx;  // Atualiza a posição no eixo X
        this.y += this.dy;  // Atualiza a posição no eixo Y

        this.draw();  // Chama o método de desenhar o círculo
    }
}

// Array para armazenar múltiplos círculos
var CircleArray = [];

// Cria 100 círculos aleatórios e adiciona ao Array de círculos
for (var i = 0; i < 100; i++) {
    var x = Math.random() * (innerWidth - r * 2) + r;  // Posição inicial X ajustada pelo raio
    var y = Math.random() * (innerHeight - r * 2) + r; // Posição inicial Y ajustada pelo raio
    var dx = (Math.random() - 0.5) * 20;  // Velocidade aleatória ajustada no eixo X
    var dy = (Math.random() - 0.5) * 20;  // Velocidade aleatória ajustada no eixo Y
    var r = 50;  // Raio padrão do círculo
    CircleArray.push(new Circle(x, y, dx, dy, r));  // Adiciona cada círculo ao Array
}

// Função principal de animação
function animate() {
    requestAnimationFrame(animate);  

    c.clearRect(0, 0, innerWidth, innerHeight);  // Limpa o canvas antes de cada desenho

    // Itera sobre cada círculo no Array e atualiza sua posição
    for (var i = 0; i < CircleArray.length; i++) {
        CircleArray[i].update();  // Atualiza cada círculo
    }
}
animate();  // Inicia a animação
