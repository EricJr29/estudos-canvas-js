const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); 

canvas.width = innerWidth;
canvas.height = innerHeight; 

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const colors = ['#034159', '#025951', '#02735E'];

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Função para calcular a distância entre dois pontos (x1, y1) e (x2, y2)
function getDistance(x1, y1, x2, y2) {
    const xDistance = x2 - x1; // Diferença no eixo X
    const yDistance = y2 - y1; // Diferença no eixo Y

    // Retorna a raiz quadrada da soma das distâncias ao quadrado
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX; 
    mouse.y = event.clientY; 
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

addEventListener('click', () => {
    init(); 
});

// Função para criar partículas
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = { // Velocidade aleatória para partículas
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
    };
    this.radius = radius; 
    this.color = color; 
    this.opacity = 0; // Opacidade inicial

    // Função para atualizar posição e verificar interações
    this.update = (particles) => {
        this.draw(); // Desenha a partícula

        // Verifica colisões com outras partículas
        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue; // Ignora a si mesmo

            if (getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2.1 <= 0) {
                const tempVelocity = { ...this.velocity }; // Guarda a velocidade temporária
                this.velocity.x = particles[i].velocity.x;
                this.velocity.y = particles[i].velocity.y;
                particles[i].velocity.x = tempVelocity.x;
                particles[i].velocity.y = tempVelocity.y;
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocity.y = -this.velocity.y; 
        }

        // Interação com o mouse
        if (getDistance(mouse.x, mouse.y, this.x, this.y) < 100 && this.opacity < .7) {
            this.opacity += 0.06; // Aumenta a opacidade se estiver perto do mouse
        } else if (this.opacity > 0) {
            this.opacity -= 0.02; // Diminui a opacidade gradualmente
            this.opacity = Math.max(0, this.opacity); // Mantém a opacidade não negativa
        }
    };

    // Função para desenhar a partícula
    this.draw = () => {
        c.beginPath(); // Inicia o caminho para o desenho
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // Desenha um arco circular
        c.save(); // Salva o estado do contexto
        c.globalAlpha = this.opacity; // Define a opacidade
        c.fillStyle = this.color; // Define a cor de preenchimento
        c.fill(); // Preenche o círculo
        c.restore(); // Restaura o estado do contexto
        c.strokeStyle = this.color; // Define a cor da borda
        c.stroke(); // Desenha a borda do círculo
        c.closePath(); // Fecha o caminho
    };
}

let particles;

function init() {
    particles = [];
    const radius = 15; 

    for (let i = 0; i < 150; i++) {
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius); 
        let color = randomColor(colors);

        // Toda particula sem ser a primeira é reiniciada caso esteja dentro de outra várias vezes até 
        //estarem separadas
        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) { //Percorre todo o Loop
                if (getDistance(x, y, particles[j].x, particles[j].y) <= radius * 2) { // Verifica se nasceram dentro
                    // Mandado para lugar aleatório
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);
                    j = -1; // Reinicia o loop para verificar novas posições
                }
            }
        }

        particles.push(new Particle(x, y, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate); 
    c.clearRect(0, 0, canvas.width, canvas.height); 

    particles.forEach((particle) => particle.update(particles));
}

init();
animate();
