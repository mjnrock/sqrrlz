import Identity from "../Identity.js";

export class Track extends Identity {
	constructor ({ frames, id, tags = [] } = {}) {
		super({ id, tags });

		this.frames = new Map();

		if(frames) {
			this.set(frames);
		}
	}

	get duration() {
		return this.frames.reduce((total, frame) => {
			return total + frame.duration;
		}, 0);
	}

	each(fn) {
		if(typeof fn === "function") {
			this.frames.forEach(fn);
		} else {
			return Array.from(this.frames.values());
		}
	}

	get(key) {
		return this.frames.get(key);
	}
	add(...frames) {
		frames.forEach((frame,i) => {
			this.frames.set(i, frame);
		});

		return this;
	}
	set(frames) {
		if(frames instanceof Map) {
			this.frames = frames;
		} else if(frames instanceof Array) {
			this.frames = new Map(frames.map((frame, i) => [ i, frame ]));
		} else {
			this.frames = new Map(Object.entries(frames));
		}

		return this;
	}
	remove(key) {
		this.frames.delete(key);

		return this;
	}
	clear() {
		this.frames.clear();

		return this;
	}

	has(key) {
		return this.frames.has(key);
	}
	swap(k1, k2) {
		let f1 = this.frames.get(k1),
			f2 = this.frames.get(k2);

		this.frames.set(k1, f2);
		this.frames.set(k2, f1);

		return this;
	}
};

export default Track;