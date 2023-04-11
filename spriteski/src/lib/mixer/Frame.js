import Identity from "../Identity";

export class Frame extends Identity {
	constructor ({ tile, duration = 250, id, tags = [] } = {}) {
		super({ id, tags });

		this.tile = tile;
		this.duration = duration;
	}

	asArray() {
		return [ this.tile, this.duration, this.id, this.tags ];
	}
};

export default Frame;