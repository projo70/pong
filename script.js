//arbeiten in 2D
let ctx = ca.getContext('2d');
//Startkoordinaten Spieler 1 und 2
let player1 = 80;
let player2 = 200;
//speichert welche Taste gedrueckt ist
let key = {};
//Der Ball
let ball = {
    x: 360,
    y: 240,
    speedX: 3,
    speedY: 0
};
//EventListener bei gedrueckten Tasten
document.addEventListener('keydown', e => key[e.keyCode] = true);
document.addEventListener('keyup', e => key[e.keyCode] = false);
draw();
setInterval(loop, 1000 / 60)

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 720, 480);
    ctx.fillStyle = 'white';
    //vierecke hinzufuegen
    ctx.fillRect(10, player1, 10, 80);
    ctx.fillRect(700, player2, 10, 80);
    ctx.fillRect(ball.x, ball.y, 10, 10);
    //function wird immer wieder ausgefuehrt
    requestAnimationFrame(draw);
}

function loop() {
    //Veraenderung der Position bei gedrueckter Taste
    if (key[38]) {
        player2 = player2 - 5;
    }

    if (key[40]) {
        player2 = player2 + 5;
    }

    if (key[87]) {
        player1 = player1 - 5;
    }

    if (key[83]) {
        player1 = player1 + 5;
    }
    //Position + Geschwindigkeit
    ball.x = ball.x + ball.speedX;
    ball.y = ball.y + ball.speedY;

    //testen ob der Ball auf der Hoehe des rechten und linken Spielers ist
    if (ball.x < 20 || ball.x > 690) {
        if (ball.y > player1 && ball.y < player1 + 80 && ball.speedX < 0) {
            //Geschwindigkeit des Balls umkehren
            ball.speedX = -ball.speedX;
            //Winkel / abprallen
            ball.speedY = (ball.y - player1 - 40) * 0.1;
        }

        if (ball.y > player2 && ball.y < player2 + 80 && ball.speedX > 0) {
            ball.speedX = -ball.speedX;
            ball.speedY = (ball.y - player2 - 40) * 0.1;
        }
    }

    //Festlegen das der Ball im Spielfeld bleibt
    if(ball.y < 0 || ball.y > 480) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x < 0 || ball.x > 720) {
        ball = {
            x: 360,
            y: 240,
            speedX: 3,
            speedY: 0
        };
    }
}