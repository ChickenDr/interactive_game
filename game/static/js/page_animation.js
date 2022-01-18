import { Draw } from "./fill_bolck.js";

var width = 1280;
var height = 700;

class App{
    constructor(){
        this.mainCanvas = document.getElementById("main-image");
        this.camCanvas = document.getElementById("cam-image");

        this.mainCtx = this.mainCanvas.getContext('2d');
        this.camCtx= this.camCanvas.getContext('2d');

        this.map = new Draw(width, height);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    animate(t) { // 애니메이션을 실제로 구동시키는 함수
        window.requestAnimationFrame(this.animate.bind(this));

        this.mainCtx.clearRect(0, 0, width, height); // 공이 이동한 이전 프레임을 지움
        this.camCtx.clearRect(0, 0, width, height);

        this.map.drawCamImg(width, height);
    }
}