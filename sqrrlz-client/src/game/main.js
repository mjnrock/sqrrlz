import { Game } from "./Game";

import { Transform } from "./entity/components/Transform";
import { Velocity } from "./entity/components/Velocity";
import { Sprite } from "./entity/components/Sprite";

import { MovementSystem } from "./systems/MovementSystem";
import { RenderSystem } from "./systems/RenderSystem";

import { Create as CreateSquirrel } from "./data/entities/Squirrel";
import Terrain from "./world/Terrain";
import Scene from "./world/Scene";
import World from "./world/World";

const game = new Game({
	entities: [
		[ CreateSquirrel(), "player" ],
		...Array.from({ length: 10 }, () => CreateSquirrel()),
	],
	loop: {
		fps: 30,
		onTick: (dt, ip) => {
			game.worlds.current.update(dt, ip, game.scene);
		},
		onRender: (dt, ip) => {
			game.systems.Render.update(dt, game.entities);
		},
	},
	library: {
		components: {
			Transform,
			Velocity,
			Sprite,
		},
		systems: {
			Movement: MovementSystem,
			Render: RenderSystem,
		},
	},
	listeners: {
		keys: [
			// (...args) => console.log("KeyInput", ...args),
		],
		pointer: [
			// (...args) => console.log("PointerInput", ...args),
			(type, e) => {
				if(type === "PointerDown") {
					game.entities.player.get(Transform).x = e.x - game.entities.player.get(Sprite).sprite.width / 2;
					game.entities.player.get(Transform).y = e.y - game.entities.player.get(Sprite).sprite.height / 2;
				}
			}
		],
	},
});

game.input.keys.attachListeners(document);
game.input.pointer.attachListeners(game.render.pixi.app.view);

game.worlds.current = new World(game, {
	entities: game.entities,
	width: 256,
	height: 256,
	update(dt, ip, scene) {
		game.systems.Movement.update(dt, this.entities);
	},
});
game.scene = new Scene(game, { world: game.worlds.current });

game.loop.start();
setTimeout(() => game.render.pixi.resize(), 1);

console.warn(game);