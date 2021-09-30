let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let btnStart = document.getElementById("start");
let btnStop = document.getElementById("stop");
let score = document.getElementById("score");
let scoreValue = 0;
let rects = [];
let timeInterval;

function getRandomColor() {
    let color = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
    return color;
}

function randomSpeed() {
    let speed = Math.round(Math.random() * 3 + 0.5);
    return speed;
}

function Rect() {
    this.w = 20;
    this.h = 20;
    this.x = Math.round(Math.random() * 640 - this.w);
    if (this.x < 0 ) {
        this.x = 0;
    }
    this.y = 0;
    this.color = getRandomColor();
    this.speed = randomSpeed();
}

function draw() {
    rects.forEach(item => {
        ctx.fillRect(item.x, item.y, item.h, item.w);
        ctx.fillStyle = item.color;
    });
}

function addRect() {
    let rect = new Rect();
    rects.push(rect);
}

btnStart.addEventListener("click", () => {
    timeInterval = setInterval(addRect, 1000);
    scoreValue = 0;
    score.innerHTML = scoreValue;
});


btnStop.addEventListener("click", function(){
    clearInterval(timeInterval);
    rects = [];
});

canvas.addEventListener("click", function(event) {
    let target = this.getBoundingClientRect();
    let x = event.clientX - target.left;
    let y = event.clientY - target.top;
    rects.forEach(function(item, i) {
        if (item.x + 20 >= x && item.x <= x && item.y + 20 >= y && item.y <= y) {
            rects.splice(i, 1);
            scoreValue = scoreValue + 1;
            score.innerHTML = scoreValue;
        }
    });
});

function animate() {
    ctx.clearRect(0, 0, 640, 480);
    draw();
    rects.forEach(item => {
        item.y = item.y + item.speed;
    });

    requestAnimationFrame(animate);
}

document.body.onload = animate;