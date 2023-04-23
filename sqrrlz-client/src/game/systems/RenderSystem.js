import { System } from "./System";

import { Transform } from "../data/components/Transform";
import { Sprite } from "../data/components/Sprite";

export class RenderSystem extends System {
	update(dt, entities) {
		this.game.render.pixi.app.stage.removeChildren();

		for(const entity of entities) {
			if(entity.has(Transform) && entity.has(Sprite)) {
				const transform = entity.get(Transform);
				const sprite = entity.get(Sprite);

				sprite.sprite.x = transform.x;
				sprite.sprite.y = transform.y;

				this.game.render.pixi.app.stage.addChild(sprite.sprite);
			}
		}
	}
};

export default RenderSystem;