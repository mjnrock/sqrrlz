import * as PIXI from "pixi.js";

const app = new PIXI.Application({
	width: 800,
	height: 600,
	backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

function gameLoop(delta) {
	// Update game state and render the scene
	update(delta);
	render(delta);

	// Request the next frame
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// Components
class Transform {
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}
}

class Velocity {
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}
}

class Sprite {
	constructor (texture) {
		this.sprite = new PIXI.Sprite(texture);
	}
}

// Entity
class Entity {
	constructor () {
		this.id = Entity.nextId++;
		this.components = new Map();
	}

	addComponent(component) {
		this.components.set(component.constructor, component);
		return this;
	}

	getComponent(ComponentType) {
		return this.components.get(ComponentType);
	}

	hasComponent(ComponentType) {
		return this.components.has(ComponentType);
	}
}
Entity.nextId = 0;

// Systems
class MovementSystem {
	update(delta, entities) {
		for(const entity of entities) {
			if(entity.hasComponent(Transform) && entity.hasComponent(Velocity)) {
				const transform = entity.getComponent(Transform);
				const velocity = entity.getComponent(Velocity);
				transform.x += velocity.x * delta;
				transform.y += velocity.y * delta;
			}
		}
	}
}

class RenderSystem {
	constructor (app) {
		this.app = app;
	}

	update(delta, entities) {
		for(const entity of entities) {
			if(entity.hasComponent(Transform) && entity.hasComponent(Sprite)) {
				const transform = entity.getComponent(Transform);
				const spriteComponent = entity.getComponent(Sprite);
				spriteComponent.sprite.x = transform.x;
				spriteComponent.sprite.y = transform.y;
				this.app.stage.addChild(spriteComponent.sprite);
			}
		}
	}
}


const characterTexture = PIXI.Texture.from("assets/images/squirrel.png");
const character = new Entity()
	.addComponent(new Transform(400, 300))
	.addComponent(new Velocity(0, 0))
	.addComponent(new Sprite(characterTexture));

const entities = [ character ];

const movementSystem = new MovementSystem();
const renderSystem = new RenderSystem(app);

function update(delta) {
	// Handle input
	const speed = 100;
	const velocity = character.getComponent(Velocity);
	velocity.x = 0;
	velocity.y = 0;

	if(keyIsDown("ArrowLeft")) {
		velocity.x -= speed;
	}
	if(keyIsDown("ArrowRight")) {
		velocity.x += speed;
	}
	if(keyIsDown("ArrowUp")) {
		velocity.y -= speed;
	}
	if(keyIsDown("ArrowDown")) {
		velocity.y += speed;
	}

	// Update systems
	movementSystem.update(delta, entities);
}

function render(delta) {
	// Clear the stage
	app.stage.removeChildren();

	// Update render system
	renderSystem.update(delta, entities);
}

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

