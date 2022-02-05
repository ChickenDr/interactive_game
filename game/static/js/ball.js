export class Ball{
    constructor(x, y, radius, e, color) {
        this.position = {x: x, y: y};
        this.velocity = {x: 0, y: 0}; // m/s
        this.e = -e; // 공의 탄성
        this.radius = radius; // 반지름
        this.color = color;
        this.area = (Math.PI * radius * radius) / 10000;
        this.gravity = 0.3;
        this.fps = 1 / 60; // t = 1 / fps

        this.bounced = 0;
    }

    ballPhysics(mouse, ballCount, canvasCtx, width, height, balls, blocks){
        if(!mouse || ballCount != balls.length - 1){
			// 공이 떨어지는 속도 v = v + g
            this.velocity.y += this.gravity;
            
			// 공위치 업데이트 p = p + v 
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            
		}
        // 벽 충돌
        this.collisionWall(width, height);
        // 장애물 충돌
        this.collisionBlock (blocks)
        // 공 그리기
        this.drawBallImg(canvasCtx);
    }

    drawBallImg(canvasCtx){ // 공 그리기
        canvasCtx.beginPath();
        canvasCtx.fillStyle = this.color;
        canvasCtx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, true);
        canvasCtx.fill();
        canvasCtx.closePath();
    }

    collisionGoal(goalx, goaly){
        if(this.position.x + this.radius + 15 > goalx 
            && this.position.x < goalx + this.radius + 15
            && this.position.y + this.radius + 15 > goaly 
            && this.position.y < goaly + this.radius + 15){
            
            //pythagoras 
            let distX = this.position.x - goalx;
            let distY = this.position.y - goaly;
            let d = Math.sqrt((distX) * (distX) + (distY) * (distY));

            //checking circle vs circle collision 
            if(d < this.radius + 15){
                return true;
            }
            return false;
        }
    }

    collisionBlock(blocks){
        for(let i = 0; i < blocks.length; i++){
            let ballRight = this.position.x + this.radius;
            let ballLeft = this.position.x - this.radius;
            let ballTop = this.position.y - this.radius;
            let ballBottom = this.position.y + this.radius;
            let pos_x = this.position.x;
            let pos_y = this.position.y;

            if(ballLeft <= blocks[i].getMaxX() && ballLeft >= blocks[i].getX() && pos_y >= blocks[i].getY() && pos_y <= blocks[i].getMaxY()){
                this.velocity.x *= this.e;
                this.position.x += this.velocity.x;
            }
            else if(ballRight <= blocks[i].getMaxX() && ballRight >= blocks[i].getX() && pos_y >= blocks[i].getY() && pos_y <= blocks[i].getMaxY()){
                this.velocity.x *= this.e;
                this.position.x += this.velocity.x;
            }
            else if(pos_x <= blocks[i].getMaxX() && pos_x >= blocks[i].getX() && ballBottom >= blocks[i].getY() && ballBottom <= blocks[i].getMaxY()){
                this.velocity.y *= this.e;
                this.position.y += this.velocity.y;
            }
            else if(pos_x <= blocks[i].getMaxX() && pos_x >= blocks[i].getX() && ballTop >= blocks[i].getY() && ballTop <= blocks[i].getMaxY()){
                this.velocity.y *= this.e;
                this.position.y += this.velocity.y;
            }
        }
    }

    collisionWall(width, height){
        if(this.position.x > width - this.radius){
            this.velocity.x *= this.e;
            this.position.x = width - this.radius;
            this.bounced += 1;
        }
        if(this.position.y > height - this.radius){
            this.velocity.y *= this.e;
            this.position.y = height - this.radius;
            this.bounced += 1;
        }
        if(this.position.x < this.radius){
            this.velocity.x *= this.e;
            this.position.x = this.radius;
            this.bounced += 1;
        }
        if(this.position.y < this.radius){
            this.velocity.y *= this.e;
            this.position.y = this.radius;
            this.bounced += 1;
        }
    }

    ballShooting(x, y){
        // 현재 포지션 - 마우스 포지션 / 10 = 속도
        this.velocity.x = (this.position.x - x) / 10;
        this.velocity.y = (this.position.y - y) / 10;
    }

    getBounced(){
        return this.bounced;
    }

    getPositionX(){
        return this.position.x;
    }

    getPositionY(){
        return this.position.y;
    }
}
