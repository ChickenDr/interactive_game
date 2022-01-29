export class Cam{
	constructor(width, height){
		this.width = width;
		this.height = height;
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
