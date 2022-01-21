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
        this.fps = 1 / 60;
    }

    ballPhysics(mouse, ballCount, ballLength, camCtx, width, height){
        if(!mouse || ballCount != ballLength){ // 마우스가 눌려 있지 않거나 모든 공을 순회 하지 못했을 때
            // 항력 계산 =  -0.5 * 공기저항 계수 * 공기 밀도 * v^2 * rho 
            let fx = -0.5 * 0.47 * 1.22 * this.area * this.velocity.x * this.velocity.x * (this.velocity.x / Math.abs(this.velocity.x));
            let fy = -0.5 * 0.47 * 1.22 * this.area * this.velocity.y * this.velocity.y * (this.velocity.y / Math.abs(this.velocity.y));
        
			fx = (isNaN(fx) ? 0 : fx);
			fy = (isNaN(fy) ? 0 : fy);
            
			// 공 가속도 구하기
			// F = ma or a = F/m
			let ax = fx / this.mass;
			let ay = (9.81 * this.gravity) + (fy / this.mass);
            
			// 공이 떨어지는 속도
            this.velocity.x += ax * this.fps;
            this.velocity.y += ay * this.fps;
            
			// 공위치 업데이트
            this.position.x += this.velocity.x * this.fps * 100;
            this.position.y += this.velocity.y * this.fps * 100;
		}
        // 공 그리기
        this.drawBallImg(camCtx);

        // 벽 충돌
        this.collisionWall(width, height);
    }

    drawBallImg(canvasCtx){
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

    collisionBall(b1){
        for(var i = 0; i < balls.length; i++){
            var b2 = balls[i];
            if(b1.position.x != b2.position.x && b1.position.y != b2.position.y){
                //quick check for potential collisions using AABBs
                if(b1.position.x + b1.radius + b2.radius > b2.position.x
                    && b1.position.x < b2.position.x + b1.radius + b2.radius
                    && b1.position.y + b1.radius + b2.radius > b2.position.y
                    && b1.position.y < b2.position.y + b1.radius + b2.radius){
                    
                    //pythagoras 
                    var distX = b1.position.x - b2.position.x;
                    var distY = b1.position.y - b2.position.y;
                    var d = Math.sqrt((distX) * (distX) + (distY) * (distY));
        
                    //checking circle vs circle collision 
                    if(d < b1.radius + b2.radius){
                        var nx = (b2.position.x - b1.position.x) / d;
                        var ny = (b2.position.y - b1.position.y) / d;
                        var p = 2 * (b1.velocity.x * nx + b1.velocity.y * ny - b2.velocity.x * nx - b2.velocity.y * ny) / (b1.mass + b2.mass);
    
                        // calulating the point of collision 
                        var colPointX = ((b1.position.x * b2.radius) + (b2.position.x * b1.radius)) / (b1.radius + b2.radius);
                        var colPointY = ((b1.position.y * b2.radius) + (b2.position.y * b1.radius)) / (b1.radius + b2.radius);
                        
                        //stoping overlap 
                        b1.position.x = colPointX + b1.radius * (b1.position.x - b2.position.x) / d;
                        b1.position.y = colPointY + b1.radius * (b1.position.y - b2.position.y) / d;
                        b2.position.x = colPointX + b2.radius * (b2.position.x - b1.position.x) / d;
                        b2.position.y = colPointY + b2.radius * (b2.position.y - b1.position.y) / d;
    
                        //updating velocity to reflect collision 
                        b1.velocity.x -= p * b1.mass * nx;
                        b1.velocity.y -= p * b1.mass * ny;
                        b2.velocity.x += p * b2.mass * nx;
                        b2.velocity.y += p * b2.mass * ny;
                    }
                }
            }
        }
    }
}

