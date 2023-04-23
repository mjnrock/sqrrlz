import * as PIXI from "pixi.js";
import Identity from "../../util/Identity";

export class Pixi extends Identity {
	constructor ({ id, tags = [], config, target = window } = {}) {
		super({ id, tags });

		this.app = new PIXI.Application(config || {
			width: 800,
			height: 600,
			backgroundColor: 0x1099bb,
		});

		target.addEventListener("resize", this.resize.bind(this));
		this.target = target;
	}

	resize() {
		const { innerWidth, innerHeight } = this.target;
		const { width, height } = this.app.renderer;
		const { x, y, width: viewWidth, height: viewHeight } = this.app.view.getBoundingClientRect();

		const finalWidth = innerWidth - x - (width - viewWidth);
		const finalHeight = innerHeight - y - (height - viewHeight);
		
		this.app.renderer.resize(finalWidth, finalHeight);
	}

	mount(element) {
		element.appendChild(this.app.view);
	}
}