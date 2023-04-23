export class Portal {
	constructor ({ source, sx, sy, target, tx, ty, onAttempt, onActivate } = {}) {
		this.source = source;
		this.sx = sx;
		this.sy = sy;

		this.target = target;
		this.tx = tx;
		this.ty = ty;

		this.attempt = onAttempt;
		this.activate = onActivate;
	}
};

export default Portal;