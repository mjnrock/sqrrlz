export class Terrain {
	static EnumType = {
		VOID: "void",
		WATER: "water",
		GRASS: "grass",
	};

	constructor ({ type, cost = 1, meta = {} } = {}) {
		this.type = type;
		this.cost = cost;
		this.meta = meta;
	}
};

export default Terrain;