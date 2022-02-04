export class Cam{
	constructor(width, height){
		this.width = width;
		this.height = height;
		this.image = new Image;

		this.type = [
			['deepsea', '#6FBAC7'],  //0
			['sea', '#9ED4DD'],      //1
			['coast', '#F3EBA9'],    //2
			['land', '#C6DB9A'],     //3
			['forest', '#A4B16E'],   //4
			['mountain', '#9E6D3D']  //5
		];

		this.pattern = [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,2,2,1,1,1,2,2,2,1,1,1,1,1,1,0,0,0,0,0],
			[0,0,0,1,1,2,2,2,2,1,2,2,3,2,2,2,1,1,1,1,1,0,0,0,0],
			[0,0,0,0,1,2,2,2,2,2,2,3,3,3,3,2,2,2,1,1,1,1,0,0,0],
			[0,0,1,1,1,2,2,3,3,2,2,3,3,3,3,2,2,2,2,2,1,1,0,0,0],
			[0,0,1,1,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,1,1,0,0],
			[0,1,1,2,2,3,3,3,3,3,4,4,4,3,3,3,3,2,2,2,2,1,1,0,0],
			[1,1,2,2,2,3,3,4,4,4,5,4,3,3,4,4,3,3,3,3,2,1,1,0,0],
			[1,2,2,2,3,3,4,5,5,4,4,4,4,4,4,5,4,3,3,3,2,2,1,1,0],
			[1,2,2,3,3,4,4,5,5,5,4,4,4,5,4,4,4,4,3,3,3,2,1,1,0],
			[1,2,2,2,3,3,4,5,5,5,4,4,5,5,5,5,4,3,3,3,3,2,2,1,1],
			[1,1,2,2,3,3,4,4,5,4,4,4,5,5,5,5,5,4,3,3,3,3,2,1,1],
			[0,1,1,2,3,3,3,4,4,3,4,4,5,5,5,5,5,4,4,3,3,3,2,1,1],
			[0,1,1,2,2,3,3,3,3,3,3,4,4,5,5,5,5,4,3,3,3,2,2,1,0],
			[0,1,1,1,2,2,4,4,3,3,4,5,4,5,5,4,4,3,3,3,2,2,1,1,0],
			[0,0,1,1,1,2,3,4,4,3,4,4,5,4,5,4,3,3,3,2,2,1,1,0,0],
			[0,0,0,1,2,2,2,3,3,3,3,4,4,4,4,3,3,3,2,2,1,1,1,0,0],
			[0,0,0,1,1,2,2,3,3,3,3,3,4,4,3,3,2,2,2,1,1,0,0,0,0],
			[0,0,0,0,1,1,2,2,3,2,3,3,3,3,3,2,2,2,1,1,1,0,0,0,0],
			[0,0,0,0,1,1,1,2,2,2,2,2,3,3,3,2,2,1,1,1,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,2,1,1,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,1,1,1,2,1,2,2,2,1,1,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]
		];
	}

	drawMap(canvasCtx){
		let x = 0;
		let y = 0;
		
		for(let row = 0; row < 25; row++){
			for(let column = 0; column < 25; column++){
				canvasCtx.fillStyle = this.type[this.pattern[row][column]][1];
				canvasCtx.fillRect(x, y, this.width / 25, this.height / 25);
				y += this.height / 25;
			}
			x += this.width / 25;
			y = 0;
		}
	}

	// drawCamImg(canvasCtx) {
	// 	this.image.src = "http://127.0.0.1:8000/web_cam/";
		
	// 	canvasCtx.drawImage(this.image, 0, 0);
	// }

	drawCamImgToDot(canvasCtx){
		for(let column = 0; x < this.width / 10; x++){
			for (let y = 0; y < this.height / 10; y++) {
				// cam 캔버스의 이미지를 데이터로 반환
				let imageData = canvasCtx.getImageData(5 + x * 10, 5 + y * 10, 5, 5);

				let avgRgb = this.getAverageRGB(imageData);

				canvasCtx.fillStyle = 'rgb(' + avgRgb.r + ', ' + avgRgb.g + ',' + avgRgb.b + ')';
				
				canvasCtx.beginPath();
				canvasCtx.arc(5 + x * 10, 5 + y * 10, 5, 0, Math.PI * 2, true);
				canvasCtx.fill();
				canvasCtx.closePath();
			}
		}
	}

	getAverageRGB(imageData){
		let rgb = {r : 0, g : 0, b : 0};
		let count = 0;
	
		// getImageData로 반환된 데이터는 rgba 4개의 값을 가지짐
		// [r, g, b, a]
		for (var i = 0; i < imageData.data.length; i += 4) {
			rgb.r += imageData.data[i];
			rgb.g += imageData.data[i + 1];
			rgb.b += imageData.data[i + 2];
			count++;
		}
	
		// 각 색의 평균을 구함
		rgb.r = Math.floor(rgb.r / count);
		rgb.g = Math.floor(rgb.g / count);
		rgb.b = Math.floor(rgb.b / count);
		return rgb;
	}
}
