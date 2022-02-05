export class Map{
	constructor(width, height){
		this.width = width;
		this.height = height;
		this.image = new Image;

		this.block = [];
		this.drawFinish = false;

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
				canvasCtx.fillStyle = this.type[this.pattern[row][column]][1];;
				canvasCtx.fillRect(x, y, this.width / 25, this.height / 25);
				if(!this.drawFinish){
					if(this.pattern[row][column] == 5){
						this.block.push(new Block(this.width / 25, this.height / 25, x, y));
					}
				}
				y += this.height / 25;
			}
			x += this.width / 25;
			y = 0;
		}

		this.drawFinish = true;
	}

	getBlocks(){
		return this.block;
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

		getWidth(){
		return this.width;
	}

	getCenter(){
		return this.center;
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