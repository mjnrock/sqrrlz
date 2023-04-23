import { System } from "./System";

import { Transform } from "../entity/components/Transform";
import { Velocity } from "../entity/components/Velocity";

export class MovementSystem extends System {
	update(dt, entities) {
		for(const entity of entities) {
			if(entity.has(Transform) && entity.has(Velocity)) {
				const transform = entity.get(Transform);
				const velocity = entity.get(Velocity);

				transform.x += velocity.x * dt;
				transform.y += velocity.y * dt;
			}
		}
	}
};