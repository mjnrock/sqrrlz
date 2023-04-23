export class Rectangle {
	constructor (x = 0, y = 0, width = 0, height = 0) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	get(x = 0, y = 0) {
		return {
			x: this.x + x,
			y: this.y + y,
			width: this.width,
			height: this.height,
		}
	}
	contains(x, y) {
		return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
	}

	static Radial(x, y, rw, rh) {
		if(!rw) rw = rh;

		return new Rectangle(x - rw, y - rh, rw * 2, rh * 2);
	}
}