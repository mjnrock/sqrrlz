import { System } from "./System";

import { Transform } from "../entity/components/Transform";
import { Velocity } from "../entity/components/Velocity";

import { KeyInput } from "./../input/KeyInput";

export class MovementSystem extends System {
	update(dt, entities) {
		for(const entity of entities) {
			if(entity.has(Transform) && entity.has(Velocity)) {
				const transform = entity.get(Transform);
				const velocity = entity.get(Velocity);

				velocity.x = 0;
				velocity.y = 0;

				if(entity === this.game.entities.player) {
					if(this.game.input.keys.has(KeyInput.EnumKeyMask.LEFT)) {
						velocity.x = -transform.speed;
					}
					if(this.game.input.keys.has(KeyInput.EnumKeyMask.RIGHT)) {
						velocity.x = transform.speed;
					}
					if(this.game.input.keys.has(KeyInput.EnumKeyMask.UP)) {
						velocity.y = -transform.speed;
					}
					if(this.game.input.keys.has(KeyInput.EnumKeyMask.DOWN)) {
						velocity.y = transform.speed;
					}
				}

				transform.x += velocity.x * dt;
				transform.y += velocity.y * dt;
			}
		}
	}
};