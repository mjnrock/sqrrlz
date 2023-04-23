import Identity from "../util/Identity";
import { Rectangle } from "../util/shapes/Rectangle";

export class Scene extends Identity {
	constructor(game, { world, id, tags = [] } = {}) {
		super({ id, tags });

		this.game = game;
		this.world = world;
		this.x = 0;
		this.y = 0;
		this.shape = Rectangle.Radial(0, 0, 128, 256);
	}

	update(dt, ip) {}
};

export default Scene;