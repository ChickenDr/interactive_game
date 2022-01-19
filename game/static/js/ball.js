export class Ball{
    constructor(x, y, radius, e, mass, color) {
        this.position = {x: x, y: y};
        this.velocity = {x: 0, y: 0}; // m/s
        this.e = e; // key event 변수
        this.mass = mass; // kg
        this.radius = radius; // 반지름
        this.color = color;
        this.area = (Math.PI * radius * radius) / 10000;
    }

    drawBallImg(canvasCtx){
        canvasCtx.beginPath();
        canvasCtx.fillStyle = this.color;
        canvasCtx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, true);
        canvasCtx.fill();
        canvasCtx.closePath();
    }

    updateVelocity(x, y){
        this.velocity.x = (this.position.x - x) / 10;
        this.velocity.y = (this.position.y - y) / 10;
    }

    getPositionX(x){
        return this.position.x;
    }

    getPositionY(y){
        return this.position.y;
    }
}

