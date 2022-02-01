import { Cam } from "./get_webcam.js";
import {Ball} from "./ball.js";

var width = 1280;
var height = 700;

class App{
    constructor(){
        this.mouse = {x: 0, y: 0, isDown: false}; // 마우스 포지션, 눌려있는지
        this.balls = [];

        this.camCanvas = document.getElementById("cam-image"); // 캠
        this.camCtx = this.camCanvas.getContext('2d');
        
        // evnet
        this.camCanvas.onmousedown = this.mouseDown.bind(this); // 마우스 누름
        this.camCanvas.onmouseup = this.mouseUp.bind(this); // 마우스 누르다 땜
        this.camCanvas.onmousemove = this.getMousePosition.bind(this); // 마우스 위치
        
        this.map = new Cam(this.camCanvas.width, this.camCanvas.height);

        window.requestAnimationFrame(this.animate.bind(this));
    }
    
    animate(t) { // 애니메이션을 실제로 구동시키는 함수    
        // 이전 프레임을 지움
        this.camCtx.clearRect(0, 0, width, height);
        
        // 화면을 그림
        this.map.drawCamImg(this.camCtx);

        // 공 그리기
        for(let ballCount = 0; ballCount < this.balls.length; ballCount++){
            this.balls[ballCount].ballPhysics(this.mouse.isDown, ballCount, this.camCtx, 
                width, height, this.balls);
        }

        if(this.mouse.isDown){
            this.camCtx.beginPath();
            this.camCtx.strokeStyle = "rgb(0, 255, 0)";
            this.camCtx.moveTo(this.balls[this.balls.length -1].getPositionX(), this.balls[this.balls.length -1].getPositionY());
            this.camCtx.lineTo(this.mouse.x, this.mouse.y);
            this.camCtx.stroke();
            this.camCtx.closePath();
        }

        window.requestAnimationFrame(this.animate.bind(this));
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
        this.mouse.x = e.pageX - this.camCanvas.offsetLeft;
        this.mouse.y = e.pageY - this.camCanvas.offsetTop;
    }
}

window.onload = () => {
    new App();
}
