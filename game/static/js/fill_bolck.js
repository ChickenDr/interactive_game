export class Draw{
	constructor(width, height){
		this.width = width;
		this.height = height;
	}

	drawCamImg(mainCtx, camCtx) {
		let image = new Image(); // Image 객체 생성
		image.src = "http://127.0.0.1:8000/web_cam/";
		
		camCtx.drawImage(image, 0, 0);
		
		for(let y = 0; y < this.width / 10; y++){
			for (let x = 0; x < this.height / 10; x++) {
				// cam 캔버스의 이미지를 데이터로 반환
				let imageData = camCtx.getImageData(5 + y * 10, 5 + x * 10, 5, 5);

				let avgRgb = this.getAverageRGB(imageData);

				mainCtx.fillStyle = 'rgb(' + avgRgb.r + ', ' + avgRgb.g + ',' + avgRgb.b + ')';
				
				mainCtx.beginPath();
				mainCtx.arc(5 + y * 10, 5 + x * 10, 5, 0, Math.PI * 2, true);
				mainCtx.fill();
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
