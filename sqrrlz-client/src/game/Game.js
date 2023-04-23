import { Registry } from "./util/Registry";
import { GameLoop } from "./loop/GameLoop";
import { Pixi } from "./render/pixi/Pixi";
import { KeyInput } from "./input/KeyInput";
import PointerInput from "./input/PointerInput";

export class Game {
	constructor ({ library = {}, loop = {}, pixi = {}, players = {}, worlds = {}, entities = [], listeners = {} } = {}) {
		this.library = {
			assets: {
				images: new Registry(),
				sounds: new Registry(),
				sprites: new Registry(),
			},
			components: {},
			entities: {},
			systems: {},
			worlds: new Registry(),
			...library,
		};

		this.systems = {};
		for(const [ name, system ] of Object.entries(this.library.systems)) {
			this.systems[ name ] = new system(this);
		}

		this.entities = new Registry();
		for(const entity of entities) {
			if(Array.isArray(entity)) {
				this.entities.registerAliased(...entity);
			} else {
				this.entities.register(entity);
			}
		}

		this.loop = new GameLoop(loop);
		this.loop.onTick.bind(this);
		this.loop.onRender.bind(this);


		this.players = players;


		this.worlds = {
			current: null,
			...worlds,
		};


		this.render = {
			pixi: new Pixi(pixi),
		};
		this.render.pixi.mount(document.body);


		this.input = {
			keys: new KeyInput({ subscribers: listeners.keys }),
			pointer: new PointerInput({ subscribers: listeners.pointer }),
		};
	}
};

export default Game;