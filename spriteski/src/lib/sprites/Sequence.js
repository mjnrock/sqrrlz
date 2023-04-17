import { Track } from "./../mixer/Track.js";
import { Frame } from "./../mixer/Frame.js";
import { Tile } from "./../tiles/Tile.js";

export class Sequence {
	constructor (track) {
		this.canvas = document.createElement("canvas");
		this.index = 0;

		this.track = track;
		this.duration = this.durations.reduce((sum, duration) => sum + duration, 0);
		this.durations = track.each().map((frame) => frame.duration);
		this.timing = this.durations.reduce((acc, duration, idx) => {
			acc[ idx ] = (acc[ idx - 1 ] || 0) + duration;
			return acc;
		}, []);

		this.bake();
	}

	async bake() {
		const frames = this.track.each();
		const fullWidth = frames.reduce((sum, frame) => sum + frame.tile.width, 0);
		const maxHeight = Math.max(...frames.map((frame) => frame.tile.height));

		this.canvas.width = fullWidth;
		this.canvas.height = maxHeight;

		const ctx = this.canvas.getContext("2d");

		let xPos = 0;
		for(const frame of frames) {
			ctx.drawImage(frame.tile.canvas, xPos, 0);
			xPos += frame.tile.width;
		}
	}

	current(startTime = 0) {
		this.index = this.timing.findIndex((elapsedTime) => elapsedTime > startTime);
		if(this.index === -1) {
			this.index = this.durations.length - 1;
		}

		const x = this.track.each().slice(0, this.index).reduce((sum, frame) => sum + frame.tile.width, 0);
		const y = 0;
		const w = this.track.get(this.index).tile.width;
		const h = this.track.get(this.index).tile.height;

		return [ this.canvas, x, y, w, h ];
	}
}

export default Sequence;