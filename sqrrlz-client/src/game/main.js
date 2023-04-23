import * as PIXI from "pixi.js";
import { Game } from "./Game";

import { Transform } from "./entity/components/Transform";
import { Velocity } from "./entity/components/Velocity";
import { Sprite } from "./entity/components/Sprite";

import { Entity } from "./entity/Entity";

import { MovementSystem } from "./systems/MovementSystem";
import { RenderSystem } from "./systems/RenderSystem";

const characterTexture = PIXI.Texture.from("assets/images/squirrel.png");
const character = new Entity([
	new Transform(400, 300),
	new Velocity(0, 0),
	new Sprite(characterTexture),
]);

console.log(character);
console.log(character.get(Transform));
console.log(character.has(Transform));

const entities = [ character ];

// Utility function to check if a key is currently pressed
const keysDown = new Set();

document.addEventListener("keydown", (event) => {
	keysDown.add(event.key);
});

document.addEventListener("keyup", (event) => {
	keysDown.delete(event.key);
});

function keyIsDown(key) {
	return keysDown.has(key);
}



const game = new Game({
	loop: {
		onTick: (dt, ip) => {
			// Handle input
			const speed = 100;
			const velocity = character.get(Velocity);
			velocity.x = 0;
			velocity.y = 0;

			if(keyIsDown("ArrowLeft") || keyIsDown("a")) {
				velocity.x = -speed;
			}
			if(keyIsDown("ArrowRight") || keyIsDown("d")) {
				velocity.x = speed;
			}
			if(keyIsDown("ArrowUp") || keyIsDown("w")) {
				velocity.y = -speed;
			}
			if(keyIsDown("ArrowDown") || keyIsDown("s")) {
				velocity.y = speed;
			}

			// Update systems
			movementSystem.update(dt, entities);
		},
		onRender: (dt, ip) => {
			// Clear the stage
			game.render.pixi.app.stage.removeChildren();

			// Update render system
			renderSystem.update(dt, entities);
		},
	},
});

const movementSystem = new MovementSystem();
const renderSystem = new RenderSystem(game.render.pixi.app);

game.library.components.registerManyAliased({
	Transform,
	Velocity,
	Sprite,
});

console.log(game.library.components);

console.log(game.render.pixi.app);

game.loop.start();