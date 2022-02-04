import { Cam } from "./draw_canvas.js";
import {Ball} from "./ball.js";

class App{
    constructor(){
        this.canvas = document.getElementById("game"); // 캠
        this.canvasCtx = this.canvas.getContext('2d');

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.mouse = {x: 0, y: 0, isDown: false}; // 마우스 포지션, 눌려있는지
        this.balls = [];
        this.goal = { x : Math.random() * (this.width - 10), y : Math.random() * (this.height - 10) };
        this.score = 0;

        // evnet
        this.canvas.onmousedown = this.mouseDown.bind(this); // 마우스 누름
        this.canvas.onmouseup = this.mouseUp.bind(this); // 마우스 누르다 땜
        this.canvas.onmousemove = this.getMousePosition.bind(this); // 마우스 위치
        
        this.map = new Cam(this.width, this.height);
        
        window.requestAnimationFrame(this.animate.bind(this));
    }
    
    animate(t) { // 애니메이션을 실제로 구동시키는 함수    
        if(this.gamover){
            // 이전 프레임을 지움
            this.canvasCtx.clearRect(0, 0, this.width, this.height);
            start.style.display = '';
            return;
        }

        else{
            this.canvasCtx.clearRect(0, 0, this.width, this.height);
            // 맵 그리기
            // this.map.drawCamImg(this.canvasCtx);
            this.map.drawMap(this.canvasCtx);
            this.drawGoal();

            // 공 그리기
            for(let ballCount = 0; ballCount < this.balls.length; ballCount++){
                this.balls[ballCount].ballPhysics(this.mouse.isDown, ballCount, this.canvasCtx, this.width, this.height, this.balls);

                if(this.balls[ballCount].getPositionY() == this.height - 10){
                    swal("Game Over!", "your score: " + this.score, "error");

                    this.gamover = true;
                    $.ajax({
                        url : '/game/',
                        type : 'POST',
                        headers : {'X-CSRFToken' : csrftoken},
                        mode : 'same-origin',
                        data : JSON.stringify({'score' : this.score}),
                        success : function(data){
                            console.log('성공');
                        },
                        erro : function(){
                            console.log("fail");
                        }
                    });
                }

                if(this.balls[ballCount].collisionGoal(this.goal.x, this.goal.y)){
                    this.balls.splice(ballCount, 1);
                    this.score += 100;
                }

            }

            if(this.mouse.isDown){
                this.dragBall(this.canvasCtx);
            }

            window.requestAnimationFrame(this.animate.bind(this));
            }
    }

    drawGoal(){
        this.canvasCtx.beginPath();
		this.canvasCtx.strokeStyle = 'rgb(0, 255, 0)';
		this.canvasCtx.arc(this.goal.x, this.goal.y, 15, 0, Math.PI * 2, true);
		this.canvasCtx.lineWidth = 5;
		this.canvasCtx.stroke();
		this.canvasCtx.closePath();
    }

    dragBall(){
        this.canvasCtx.beginPath();
        this.canvasCtx.strokeStyle = "rgb(0, 255, 0)";
        this.canvasCtx.moveTo(this.balls[this.balls.length -1].getPositionX(), this.balls[this.balls.length -1].getPositionY());
        this.canvasCtx.lineTo(this.mouse.x, this.mouse.y);
        this.canvasCtx.stroke();
        this.canvasCtx.closePath();
    }
        
    mouseDown(e){
        if (e.which == 1) {
            this.mouse.isDown = true;
            // 색상 범위
            let max = 255;
            let min = 20;
            
            let rgb = {r: 0, g: 0, b: 0};
            rgb.r = 75 + Math.floor(Math.random() * (max - min) - min);
            rgb.g = 75 + Math.floor(Math.random() * (max - min) - min);
            rgb.b = 75 + Math.floor(Math.random() * (max - min) - min);
            // 공 추가 (마우스 위치 x, y, 반지름, 탄성, 질량, 색)
            this.balls.push(new Ball(this.mouse.x, this.mouse.y, 10, 0.5, 10, 
                "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")"));
        }
    }

    mouseUp(e){
        if (e.which == 1) {
            this.mouse.isDown = false;
            this.balls[this.balls.length - 1].ballShooting(this.mouse.x, this.mouse.y);
        }
    }

    getMousePosition(e){
        this.mouse.x = e.pageX - this.canvas.offsetLeft;
        this.mouse.y = e.pageY - this.canvas.offsetTop;
    }
}

window.onload = () => {
    var start = document.getElementById('start');
    
    start.onclick = function() {
        start.style.display = 'none';
        new App(start);
    }

}
