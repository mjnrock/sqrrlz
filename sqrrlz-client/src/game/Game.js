import { Registry } from "./util/Registry";
import { GameLoop } from "./loop/GameLoop";
import { Pixi } from "./render/pixi/Pixi";

export class Game {
	constructor ({ library = {}, loop = {}, pixi = {} } = {}) {
		this.library = {
			assets: {
				images: new Registry(),
				sounds: new Registry(),
				sprites: new Registry(),
			},
			components: new Registry(),
			entities: new Registry(),
			systems: new Registry(),
			items: new Registry(),
			world: new Registry(),
			...library,
		};


		this.loop = new GameLoop(loop);


		this.players = new Registry();


		this.world = new Registry();


		this.render = {
			pixi: new Pixi(pixi),
		};
		document.body.appendChild(this.render.pixi.app.view);


		this.input = {
			keys: {
				onKeyDown: null,
				onKeyUp: null,
				mask: 0,
			},
			pointer: {
				onMouseDown: null,
				onMouseUp: null,
				onMouseMove: null,
				onMouseWheel: null,
				mask: 0,
			},
		};
	}
};

export default Game;