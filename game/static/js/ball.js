export class Ball{
    constructor(x, y, radius, e, color) {
        this.position = {x: x, y: y};
        this.velocity = {x: 0, y: 0}; // m/s
        this.e = -e; // 공의 탄성
        this.radius = radius; // 반지름
        this.color = color;
        this.gravity = 0.3;

        this.bounced = 1;
    }

    ballPhysics(mouse, ballCount, canvasCtx, width, height, balls, blocks){
        if(!mouse || ballCount != balls.length - 1){
            // 공이 떨어지는 속도 v = v + g
            this.velocity.y += this.gravity;
            // 장애물 충돌
            this.collisionBlock(blocks);
			// 공위치 업데이트 p = p + v 
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
		}
        // 벽 충돌
        this.collisionWall(width, height);
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
        if(this.position.x + this.radius + 30 > goalx 
            && this.position.x < goalx + this.radius + 30
            && this.position.y + this.radius + 30 > goaly 
            && this.position.y < goaly + this.radius + 30){
            
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
            const minX = blocks[i].getX() - this.radius;
            const maxX = blocks[i].getMaxX() + this.radius;
            const minY = blocks[i].getY() - this.radius;
            const maxY = blocks[i].getMaxY() + this.radius;

            if(this.position.x > minX && this.position.x < maxX && this.position.y > minY && this.position.y < maxY){
                const x1 = Math.abs(minX - this.position.x);
                const x2 = Math.abs(this.position.x - maxX);
                const y1 = Math.abs(minY - this.position.y);
                const y2 = Math.abs(this.position.x - maxY);

                const min1 = Math.min(x1, x2);
                const min2 = Math.min(y1, y2);
                const min = Math.min(min1, min2);

                if(min == min1){
                    this.velocity.x *= this.e;
                    this.position.x += this.velocity.x;
                }
                else if(min == min2){
                    this.velocity.y *= this.e;
                    this.position.x += this.velocity.y;
                }
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
        this.velocity.x = (this.position.x - x) / 7;
        this.velocity.y = (this.position.y - y) / 7;
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
