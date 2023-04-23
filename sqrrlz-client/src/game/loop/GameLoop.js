import Identity from "../util/Identity";

export class GameLoop extends Identity {
	constructor ({ id, tags = [], fps = 24, onTick, onRender, ...props } = {}) {
		super({ id, tags });

		this.ticks = 0;
		this.lastTick = 0;
		this.tickId = null;
		this.onTick = onTick;

		this.renders = 0;
		this.lastRender = 0;
		this.onRender = onRender;

		this.fps = fps;
		this.startTime = 0;
		this.isRunning = false;

		Object.assign(this, props);
	}

	get spf() {
		return 1000 / this.fps;
	}

	start() {
		this.startTime = Date.now();
		this.isRunning = true;
		this.tick();
		this.render();
	}

	stop() {
		this.isRunning = false;
	}

	tick() {
		if(this.isRunning) {
			this.ticks++;

			if(this.onTick) {
				const dt = Date.now() - this.lastTick;
				const ip = dt / this.spf;

				this.onTick(dt / 1000, ip);
			}

			this.lastTick = Date.now();

			this.tickId = setTimeout(() => this.tick(), this.spf);
		}
	}

	render() {
		if(this.isRunning) {
			this.renders++;

			if(this.onRender) {
				const dt = Date.now() - this.lastRender;
				const ip = dt / this.spf;

				this.onRender(dt / 1000, ip);
			}

			this.lastRender = Date.now();

			requestAnimationFrame(() => this.render());
		}
	}

	toObject(...args) {
		return {
			...super.toObject(...args),
			ticks: this.ticks,
			lastTick: this.lastTick,
			renders: this.renders,
			lastRender: this.lastRender,
			fps: this.fps,
			startTime: this.startTime,
			isRunning: this.isRunning,
		};
	}
	toString(...args) {
		return JSON.stringify(this.toObject(...args));
	}
};

export default GameLoop;