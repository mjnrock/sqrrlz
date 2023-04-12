import Identity from "../Identity.js";

export class Mixer extends Identity {
	constructor ({ tracks, id, tags = [] } = {}) {
		super({ id, tags });

		this.tracks = new Map();

		if(tracks) {
			this.set(tracks);
		}
	}

	get duration() {
		return this.tracks.reduce((total, track) => {
			return total + track.duration;
		}, 0);
	}

	each(fn) {
		if(typeof fn === "function") {
			this.tracks.forEach(fn);
		} else {
			return Array.from(this.tracks.values());
		}
	}

	get(key) {
		return this.tracks.get(key);
	}
	add(...tracks) {
		tracks.forEach((track,i) => {
			this.tracks.set(i, track);
		});

		return this;
	}
	set(tracks) {
		if(tracks instanceof Map) {
			this.tracks = tracks;
		} else if(tracks instanceof Array) {
			this.tracks = new Map(tracks.map((track, i) => [ i, track ]));
		} else {
			this.tracks = new Map(Object.entries(tracks));
		}

		return this;
	}
	remove(key) {
		this.tracks.delete(key);

		return this;
	}
	clear() {
		this.tracks.clear();

		return this;
	}

	has(key) {
		return this.tracks.has(key);
	}
	swap(k1, k2) {
		let f1 = this.tracks.get(k1),
			f2 = this.tracks.get(k2);

		this.tracks.set(k1, f2);
		this.tracks.set(k2, f1);

		return this;
	}
};

export default Mixer;