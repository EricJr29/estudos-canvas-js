const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); 

canvas.width = innerWidth;
canvas.height = innerHeight; 

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

function animate() {
    requestAnimationFrame(animate); 

    c.fillStyle = '#1a1a23';
    c.fillRect(0, 0, canvas.width, canvas.height);

    if (
        mouse.x + 100 >= canvas.width / 2 - 50 && 
        mouse.x <= canvas.width / 2 - 50 + 100 &&      
        mouse.y + 100 >= canvas.height / 2 - 50 && 
        mouse.y <= canvas.height / 2 - 50 + 100        
    ) {
        console.log('erro');
    }

    c.fillStyle = 'red';
    c.fillRect(mouse.x, mouse.y, 100, 100);

    c.fillStyle = 'blue';
    c.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
}

animate();
