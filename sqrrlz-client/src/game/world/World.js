import Identity from "../util/Identity";
import { Registry } from "../util/Registry";

import { Terrain } from "./Terrain";

export class World extends Identity {
	constructor (game, { terrain = {}, entities = [], width = 400, height = 400, update, id, tags = [] } = {}) {
		super({ id, tags });

		this.game = game;
		this.width = width;
		this.height = height;

		this.entities = new Registry(entities);
		this.terrain = new Map();
		this.portals = new Map();

		this.update = update || this.update;
	}

	setTerrain(tx, ty, terrain) {
		this.terrain.set(`${ tx },${ ty }`, terrain);
	}

	update(dt, ip, scene) { }
};

export default World;