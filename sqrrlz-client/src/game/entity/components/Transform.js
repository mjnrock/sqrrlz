export class Transform {
	constructor ({ speed = 100, x = 0, y = 0 } = {}) {
		this.x = x;
		this.y = y;

		this.speed = speed;
	}
};