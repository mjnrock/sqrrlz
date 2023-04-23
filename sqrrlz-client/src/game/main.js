import { Game } from "./Game";

import { Transform } from "./data/components/Transform";
import { Velocity } from "./data/components/Velocity";
import { Sprite } from "./data/components/Sprite";

import { MovementSystem } from "./systems/MovementSystem";
import { RenderSystem } from "./systems/RenderSystem";

import { Create as CreateSquirrel } from "./data/entities/Squirrel";

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
	width: 256,
	height: 256,
	entities: game.entities,
	update(dt, ip, scene) {
		game.systems.Movement.update(dt, this.entities);
	},
});
game.scene = new Scene(game, { world: game.worlds.current });

game.loop.start();
setTimeout(() => game.render.pixi.resize(), 1);

console.warn(game);