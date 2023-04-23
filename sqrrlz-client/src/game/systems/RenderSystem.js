import { System } from "./System";

import { Transform } from "../entity/components/Transform";
import { Sprite } from "../entity/components/Sprite";

export class RenderSystem extends System {
	constructor (game, opts = {}) {
		super({ ...opts });

		this.game = game;
	}

	update(dt, entities) {
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