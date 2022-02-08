export class Map{
	constructor(width, height){
		this.width = width;
		this.height = height;

		this.block = [];
		this.drawFinish = false;

		this.mapW = Math.floor(this.width / 25);
		this.mapH = Math.floor(this.height / 25);

		this.type = [
			['deepsea', '#6FBAC7'],  //0
			['sea', '#9ED4DD'],      //1
			['coast', '#F3EBA9'],    //2
			['land', '#C6DB9A'],     //3
			['forest', '#A4B16E'],   //4
			['mountain', '#9E6D3D']  //5
		];

		this.pattern = [ // 25 * 25 사이즈
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,2,2,1,1,1,2,2,2,1,1,1,1,1,1,0,0,0,0,0],
			[0,0,0,1,1,2,2,2,2,1,2,2,3,2,2,2,1,1,1,1,1,0,0,0,0],
			[0,0,0,0,1,2,2,2,2,2,2,3,3,3,3,2,2,2,1,1,1,1,0,0,0],
			[0,0,1,1,1,2,2,3,3,2,2,3,3,3,3,2,3,2,2,2,1,1,0,0,0],
			[0,0,1,1,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,1,1,0,0],
			[0,1,1,2,2,3,3,3,3,3,4,5,4,3,3,3,3,2,2,2,2,1,1,0,0],
			[1,1,2,2,2,3,3,4,4,4,4,4,3,3,4,4,3,3,3,3,2,1,1,0,0],
			[1,2,2,2,3,3,4,5,3,5,4,4,4,4,4,5,4,3,3,3,2,2,1,1,0],
			[1,2,2,3,3,4,4,4,3,4,4,4,4,4,4,4,4,4,3,3,3,2,1,1,0],
			[1,2,2,2,3,3,4,4,3,5,4,4,4,4,4,4,4,3,3,3,3,2,2,1,1],
			[1,1,2,2,3,3,4,4,4,4,4,4,4,5,3,3,5,4,3,3,3,3,2,1,1],
			[0,1,1,2,3,3,3,4,4,3,4,4,4,5,4,4,4,4,4,3,3,3,2,1,1],
			[0,1,1,2,2,3,3,3,3,3,3,4,4,4,4,5,4,4,3,3,3,2,2,1,0],
			[0,1,1,1,2,2,4,4,3,3,4,5,4,5,4,4,4,3,3,3,2,2,1,1,0],
			[0,0,1,1,1,2,3,4,4,3,4,4,4,4,4,4,3,3,3,2,2,1,1,0,0],
			[0,0,0,1,2,2,2,3,3,3,3,4,4,4,4,3,3,3,2,2,1,1,1,0,0],
			[0,0,0,1,1,2,2,3,5,3,3,3,4,4,3,3,2,2,2,1,1,0,0,0,0],
			[0,0,0,0,1,1,2,2,3,2,3,3,3,3,3,2,2,2,1,1,1,0,0,0,0],
			[0,0,0,0,1,1,1,2,2,2,2,2,3,3,3,2,2,1,1,1,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,2,1,1,1,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,1,1,1,2,1,2,2,2,1,1,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]
		];
	}

	drawMap(canvasCtx, startPos){
		for(let row = 0; row < 25; row++){
			for(let column = 0; column < 25; column++){
				canvasCtx.fillStyle = this.type[this.pattern[row][column]][1];
				canvasCtx.fillRect(row * this.mapW, column * this.mapH, this.mapW, this.mapH);
			}
		}

		canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
		canvasCtx.fillRect(0, 0, startPos, this.height);
	}

	setBlocks(){
		for(let row = 0; row < 25; row++){
			for(let column = 0; column < 25; column++){
				if(this.pattern[row][column] == 5){
					this.block.push(new Block(this.mapW, this.mapH, row * this.mapW, column * this.mapH));
				}
			} 
		}
	}

	getBlocks(){
		return this.block;
	}

	updateWidthHeight(width, height){
		this.width = width;
		this.height = height;
	}
}

class Block{
    constructor(width, height, x, y){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.maxX = width + x;
        this.maxY = height + y;
		this.center = { x : (x + this.maxX) / 2, y : (y + this.maxY)};
	}

	getCenter(){
		return this.center;
	}

	getWidth(){
		return this.width;
	}

	getHeight(){
		return this.height;
	}

	getX(){
		return this.x;
	}

	getY(){
		return this.y;
	}

	getMaxX(){
		return this.maxX;
	}

	getMaxY(){
		return this.maxY;
	}
}