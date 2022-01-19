import { Draw } from "./fill_bolck.js";
import {Ball} from "./ball.js";

var width = 1280;
var height = 700;

var gravity = 1; // 1g
var density = 50; // 50kg


class App{
    constructor(){
        this.mouse = {x: 0, y: 0, isDown: false}; // 마우스 포지션, 눌려있는지
        this.balls = [];

        this.mainCanvas = document.getElementById("main-image"); // 맵
        this.camCanvas = document.getElementById("cam-image"); // 캠

        this.mainCtx = this.mainCanvas.getContext('2d');
        this.camCtx = this.camCanvas.getContext('2d');

        this.camCanvas.onmousedown = this.mouseDown.bind(this); // 마우스 누름
        this.camCanvas.onmouseup = this.mouseUp.bind(this); // 마우스 누르다 땜
        this.camCanvas.onmousemove = this.getMousePosition.bind(this); // 마우스 위치

        this.map = new Draw(width, height);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    async animate(t) { // 애니메이션을 실제로 구동시키는 함수    
        // 이전 프레임을 지움
        this.mainCtx.clearRect(0, 0, width, height); 
        this.camCtx.clearRect(0, 0, width, height);
        
        // 화면을 그림
        this.map.drawCamImg(this.mainCtx, this.camCtx);
        
        // 공 그리기
        for(let i = 0; i < this.balls.length; i++){
            this.balls[i].drawBallImg(this.camCtx);
        }


        await this.sleep(); 
        window.requestAnimationFrame(this.animate.bind(this));
    }

    sleep() { 
        return new Promise(requestAnimationFrame); 
    }

    mouseDown(e){
        if (e.which == 1) {
            this.mouse.isDown = true; // 눌려있음

            // 랜덤 색상 범위 변수
            let max = 255;
            let min = 20;
            
            let rgb = {r: 0, g: 0, b: 0};
            rgb.r = 75 + Math.floor(Math.random() * (max - min) - min);
            rgb.g = 75 + Math.floor(Math.random() * (max - min) - min);
            rgb.b = 75 + Math.floor(Math.random() * (max - min) - min);

            this.balls.push(new Ball(this.mouse.x, this.mouse.y, 10, 0.7, 10, "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")"));
        }
    }

    mouseUp(e){
        if (e.which == 1) {
            this.mouse.isDown = false;

            // Ball.velocity = {x: 0, y: 0} => m/s
            // position - mouse.* / 10
            this.balls[this.balls.length - 1].updateVelocity(this.mouse.x, this.mouse.y);
        }
    }

    getMousePosition(e){
        this.mouse.x = e.pageX - this.camCanvas.offsetLeft;
        this.mouse.y = e.pageY - this.camCanvas.offsetTop;
    }
}

window.onload = () => {
    new App();
}

function collisionWall(ball){
	if(ball.position.x > width - ball.radius){
		ball.velocity.x *= ball.e;
		ball.position.x = width - ball.radius;
	}
	if(ball.position.y > height - ball.radius){
		ball.velocity.y *= ball.e;
		ball.position.y = height - ball.radius;
	}
	if(ball.position.x < ball.radius){
		ball.velocity.x *= ball.e;
		ball.position.x = ball.radius;
	}
	if(ball.position.y < ball.radius){
		ball.velocity.y *= ball.e;
		ball.position.y = ball.radius;
	}
}
function collisionBall(b1){
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