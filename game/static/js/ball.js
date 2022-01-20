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

    updateVelocity(ax, ay, fps){
        this.velocity.x += ax * fps;
        this.velocity.y += ay * fps;
    }

    updatePosition(fps){
        this.position.x += this.velocity.x * fps * 100;
        this.position.y += this.velocity.y * fps * 100;
    }

    getMess(){
        return this.mass;
    }

    getVelocityX(){
        return this.velocity.x;
    }
    
    getVelocityY(){
        return this.velocity.y;
    }

    getPositionX(){
        return this.position.x;
    }

    getPositionY(){
        return this.position.y;
    }
    
    calculateDrag(){
        let fp = {fx : 0, fy : 0};
        // 항력 계산 =  -0.5 * 공기저항 계수 * 공기 밀도 * v^2 * rho 
        fp.fx = -0.5 * 0.47 * 1.22 * this.area * this.velocity.x * this.velocity.x * (this.velocity.x / Math.abs(this.velocity.x));
        fp.fy = -0.5 * 0.47 * 1.22 * this.area * this.velocity.y * this.velocity.y * (this.velocity.y / Math.abs(this.velocity.y));
        
        return fp;
    }

}

