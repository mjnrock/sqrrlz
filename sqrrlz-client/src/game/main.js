import * as PIXI from "pixi.js";
import { Game } from "./Game";

import { Transform } from "./entity/components/Transform";
import { Velocity } from "./entity/components/Velocity";
import { Sprite } from "./entity/components/Sprite";

import { Entity } from "./entity/Entity";

import { MovementSystem } from "./systems/MovementSystem";
import { RenderSystem } from "./systems/RenderSystem";

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
			game.systems.Movement.update(dt, game.entities);
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
setTimeout(() => game.render.pixi.resize(), 1);

console.warn(game);