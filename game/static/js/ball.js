export class Ball{
    constructor(x, y, radius, e, mass, color) {
        this.position = {x: x, y: y};
        this.velocity = {x: 0, y: 0}; // m/s
        this.e = -e; // 공의 탄성
        this.mass = mass; // kg 질량
        this.radius = radius; // 반지름
        this.color = color;
        this.area = (Math.PI * radius * radius) / 10000;

        this.gravity = 1;
        this.fps = 1 / 60; // t = 1 / fps
    }

    ballPhysics(mouse, ballCount, camCtx, width, height, balls){
        if(!mouse || ballCount != balls.length - 1){ // 마우스가 눌려 있지 않거나 모든 공을 순회 하지 못했을 때
            // 항력 계산 =  -0.5 * 공기저항 계수 * 공기 밀도 * v^2 * rho 
            let fx = -0.5 * 1.22 * this.area * this.velocity.x * this.velocity.x * (this.velocity.x / Math.abs(this.velocity.x));
            let fy = -0.5 * 1.22 * this.area * this.velocity.y * this.velocity.y * (this.velocity.y / Math.abs(this.velocity.y));
        
			fx = (isNaN(fx) ? 0 : fx);
			fy = (isNaN(fy) ? 0 : fy);
            
			// 공 가속도 구하기
			// F = ma or a = F/m
			let ax = fx / this.mass;
			let ay = (9.81 * this.gravity) + (fy / this.mass);
            
			// 공이 떨어지는 속도 v = v + a(가속도) * t
            this.velocity.x += ax * this.fps;
            this.velocity.y += ay * this.fps;
            
			// 공위치 업데이트 p = p + v * t
            this.position.x += this.velocity.x * this.fps * 100;
            this.position.y += this.velocity.y * this.fps * 100;
		}
        // 공 그리기
        this.drawBallImg(camCtx);


        // 벽 충돌
        this.collisionWall(width, height);
        // 흰색 영역 충돌
        this.collisionBall(balls);
        // 공끼리 충돌
        this.collisionWhite(camCtx);
    }

    drawBallImg(canvasCtx){ // 공 그리기
        canvasCtx.beginPath();
        canvasCtx.fillStyle = this.color;
        canvasCtx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, true);
        canvasCtx.fill();
        canvasCtx.closePath();
    }

    collisionWall(width, height){
        if(this.position.x > width - this.radius){
            this.velocity.x *= this.e;
            this.position.x = width - this.radius;
        }
        if(this.position.y > height - this.radius){
            this.velocity.y *= this.e;
            this.position.y = height - this.radius;
        }
        if(this.position.x < this.radius){
            this.velocity.x *= this.e;
            this.position.x = this.radius;
        }
        if(this.position.y < this.radius){
            this.velocity.y *= this.e;
            this.position.y = this.radius;
        }
    }

    ballShooting(x, y){
        // 현재 포지션 - 마우스 포지션 / 10 = 속도
        this.velocity.x = (this.position.x - x) / 10;
        this.velocity.y = (this.position.y - y) / 10;
    }

    collisionWhite(camCtx){
        let x_left = camCtx.getImageData(this.position.x - this.radius, this.position.y, 1, 1);
        let x_right = camCtx.getImageData(this.position.x + this.radius, this.position.y, 1, 1);
        let y_up = camCtx.getImageData(this.position.x, this.position.y - this.radius, 1, 1);
        let y_down = camCtx.getImageData(this.position.x, this.position.y + this.radius, 1, 1);

        if (x_left.data[0] == 255) {
            this.whtitCollisionCheck(this.position.x - this.radius, this.position.y);
        }
        if (x_right.data[0] == 255) {
            this.whtitCollisionCheck(this.position.x + this.radius, this.position.y);
        }
        if (y_up.data[0] == 255) {
            this.whtitCollisionCheck(this.position.x, this.position.y + this.radius);
        }
        if (y_down.data[0] == 255) {
            this.whtitCollisionCheck(this.position.x, this.position.y - this.radius);
        }
    }

    whtitCollisionCheck(x, y){
        let distX = this.position.x - x;
        let distY = this.position.y - y;
        let d = Math.sqrt((distX) * (distX) + (distY) * (distY));

        if(d < this.radius + 1){
            let nx = (x - this.position.x) / d;
            let ny = (y - this.position.y) / d;
            let p = 2 * (this.velocity.x * nx + this.velocity.y * ny) / (this.mass);

            //stoping overlap 
            this.position.x = this.radius * (this.position.x) / d;
            this.position.y = this.radius * (this.position.y) / d;

            //updating velocity to reflect collision 
            this.velocity.x -= p * this.mass * nx;
            this.velocity.y -= p * this.mass * ny;
        }
    }

    collisionBall(balls){
        for(let i = 0; i < balls.length; i++){
            let ball = balls[i];
            if(this != ball){
                //quick check for potential collisions using AABBs
                if(this.position.x + this.radius + ball.radius > ball.position.x
                    && this.position.x < ball.position.x + this.radius + ball.radius
                    && this.position.y + this.radius + ball.radius > ball.position.y
                    && this.position.y < ball.position.y + this.radius + ball.radius){
                    
                    //pythagoras 
                    let distX = this.position.x - ball.position.x;
                    let distY = this.position.y - ball.position.y;
                    let d = Math.sqrt((distX) * (distX) + (distY) * (distY));
        
                    //checking circle vs circle collision 
                    if(d < this.radius + ball.radius){
                        let nx = (ball.position.x - this.position.x) / d;
                        let ny = (ball.position.y - this.position.y) / d;
                        let p = 2 * (this.velocity.x * nx + this.velocity.y * ny - ball.velocity.x * nx - ball.velocity.y * ny) / (this.mass + ball.mass);
    
                        // calulating the point of collision 
                        let colPointX = ((this.position.x * ball.radius) + (ball.position.x * this.radius)) / (this.radius + ball.radius);
                        let colPointY = ((this.position.y * ball.radius) + (ball.position.y * this.radius)) / (this.radius + ball.radius);
                        
                        //stoping overlap 
                        this.position.x = colPointX + this.radius * (this.position.x - ball.position.x) / d;
                        this.position.y = colPointY + this.radius * (this.position.y - ball.position.y) / d;
                        ball.position.x = colPointX + ball.radius * (ball.position.x - this.position.x) / d;
                        ball.position.y = colPointY + ball.radius * (ball.position.y - this.position.y) / d;
    
                        //updating velocity to reflect collision 
                        this.velocity.x -= p * this.mass * nx;
                        this.velocity.y -= p * this.mass * ny;
                        ball.velocity.x += p * ball.mass * nx;
                        ball.velocity.y += p * ball.mass * ny;
                    }
                }
            }
        }
    }

    getPositionX(){
        return this.position.x;
    }

    getPositionY(){
        return this.position.y;
    }
}
