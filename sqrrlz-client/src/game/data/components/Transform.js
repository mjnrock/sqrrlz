import { EnumEntityState } from "../enum/EnumEntityState";
import { EnumFacing } from "../enum/EnumFacing";

export class Transform {
	constructor ({ state, speed = 100, x = 0, y = 0, facing } = {}) {
		this.x = x;
		this.y = y;
		this.facing = facing || EnumFacing.EAST;

		this.speed = speed;
		this.state = state || EnumEntityState.IDLE;
	}
};