export class Cam{
	constructor(width, height){
		this.width = width;
		this.height = height;
		this.image = new Image;
	}

	drawCamImg(camCtx) {
		this.image.src = "http://127.0.0.1:8000/web_cam/";
		
		camCtx.drawImage(this.image, 0, 0);
	}

	drawCamImgToDot(camCtx){
		for(let y = 0; x < this.width / 10; x++){
			for (let y = 0; y < this.height / 10; y++) {
				// cam 캔버스의 이미지를 데이터로 반환
				let imageData = camCtx.getImageData(5 + x * 10, 5 + y * 10, 5, 5);

				let avgRgb = this.getAverageRGB(imageData);

				camCtx.fillStyle = 'rgb(' + avgRgb.r + ', ' + avgRgb.g + ',' + avgRgb.b + ')';
				
				camCtx.beginPath();
				camCtx.arc(5 + x * 10, 5 + y * 10, 5, 0, Math.PI * 2, true);
				camCtx.fill();
				camCtx.closePath();
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
