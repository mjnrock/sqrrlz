import * as PIXI from "pixi.js";

const app = new PIXI.Application({
	width: 800,
	height: 600,
	backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

let lastTime = 0;
function gameLoop(elapsed) {
	// Calculate delta time
	const dt = (elapsed - lastTime) / 1000;
	lastTime = elapsed;
	
	// Update game state and render the scene
	update(dt);
	render(dt);

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
	update(dt, entities) {
		for(const entity of entities) {
			if(entity.hasComponent(Transform) && entity.hasComponent(Velocity)) {
				const transform = entity.getComponent(Transform);
				const velocity = entity.getComponent(Velocity);
				transform.x += velocity.x * dt;
				transform.y += velocity.y * dt;
			}
		}
	}
}

class RenderSystem {
	constructor (app) {
		this.app = app;
	}

	update(dt, entities) {
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

function update(dt) {
	// Handle input
	const speed = 100;
	const velocity = character.getComponent(Velocity);
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
}

function render(dt) {
	// Clear the stage
	app.stage.removeChildren();

	// Update render system
	renderSystem.update(dt, entities);
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

