import * as PIXI from "pixi.js";
import { Game } from "./Game";

import { Transform } from "./entity/components/Transform";
import { Velocity } from "./entity/components/Velocity";
import { Sprite } from "./entity/components/Sprite";

import { Entity } from "./entity/Entity";

import { MovementSystem } from "./systems/MovementSystem";
import { RenderSystem } from "./systems/RenderSystem";

import { KeyInput } from "./input/KeyInput";

const game = new Game({
	entities: [
		[ new Entity([
			new Transform({ speed: 165, x: 400, y: 300 }),
			new Velocity(0, 0),
			new Sprite(PIXI.Texture.from("assets/images/squirrel.png")),
		]), "player" ],
	],
	loop: {
		onTick: (dt, ip) => {
			const { speed } = game.entities.player.get(Transform);
			const velocity = game.entities.player.get(Velocity);

			velocity.x = 0;
			velocity.y = 0;

			if(game.input.keys.has(KeyInput.EnumKeyMask.LEFT)) {
				velocity.x = -speed;
			}
			if(game.input.keys.has(KeyInput.EnumKeyMask.RIGHT)) {
				velocity.x = speed;
			}
			if(game.input.keys.has(KeyInput.EnumKeyMask.UP)) {
				velocity.y = -speed;
			}
			if(game.input.keys.has(KeyInput.EnumKeyMask.DOWN)) {
				velocity.y = speed;
			}

			game.systems.Movement.update(dt, game.entities);
		},
		onRender: (dt, ip) => {
			game.render.pixi.app.stage.removeChildren();
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
			(...args) => console.log("KeyInput", ...args),
		],
		pointer: [
			// (...args) => console.log("PointerInput", ...args),
		],
	},
});

game.input.keys.attachListeners(document);
game.input.pointer.attachListeners(game.render.pixi.app.view);

game.loop.start();

console.warn(game);
setTimeout(() => game.render.pixi.resize(), 1);