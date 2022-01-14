window.onload = function() {
	let main_image = document.getElementById("main-image");
	let manipulation_image = document.getElementById("manipulation-image")

	let main_cxt = main_image.getContext('2d');
	let manipulation_ctx = manipulation_image.getContext('2d');

	let image = new Image(); // Image 객체 생성
	
	// 이미지 로드 완료시 동작 할 함수
	image.onload = function(){
		main_cxt.drawImage(image, 0, 0);
		
		for(let y = 0; y < main_image.width / 10; y++){
			for (let x = 0; x < main_image.height / 10; x++) {
				// main 캔버스의 이미지를 데이터로 반환
				let imageData = main_cxt.getImageData(12.5 + y * 25, 12.5 + x * 25, 10, 10);

				let avg_rgb = getAverageRGB(imageData);

				manipulation_ctx.fillStyle = 'rgb(' + avg_rgb.r + ', ' + avg_rgb.g + ',' + avg_rgb.b + ')';
				
				manipulation_ctx.beginPath();
				manipulation_ctx.arc(12.5 + y * 25, 12.5 + x * 25, 10, 0, Math.PI * 2, true);
				manipulation_ctx.stroke();
				manipulation_ctx.fill()
			}
		}	
	};

	image.src = "sample.png";
};

// 영역 rgb 평균값 
function getAverageRGB(imageData){
	let rgb = {r : 0, g : 0, b : 0};
	let count = 0;

	// getImageData로 반환된 데이터는 rgba 4개의 값을 가지짐
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