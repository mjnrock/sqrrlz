import Identity from "../Identity";

export const EnumTickerMode = Object.freeze({
	ONCE: 0,
	LOOP: 1,
});

export const EnumTickerStatus = Object.freeze({
	FRESH: 0,
	RUNNING: 1,
	PAUSED: 2,
	STOPPED: 3,
});

export class Ticker extends Identity {
	constructor ({ listeners = [], mode, interval, id, tags = [] } = {}) {
		super({ id, tags });

		this.mode = mode || EnumTickerMode.LOOP;
		this.interval = interval || 250;
		this.intervalId = null;
		this.startTime = 0;
		this.lastTick = 0;
		this.tickCount = 0;
		this.status = EnumTickerStatus.FRESH;

		this.listeners = new Set(listeners);
	}

	get elapsed() {
		if(this.status === EnumTickerStatus.RUNNING) {
			return Date.now() - this.startTime;
		} else {
			return 0;
		}
	}
	get ratio() {
		return (this.elapsed % this.interval) / this.interval;
	}

	start() {
		this.startTime = Date.now();
		this.lastTick = this.startTime;
		this.tickCount = 0;
		this.status = EnumTickerStatus.RUNNING;

		if(this.mode === EnumTickerMode.ONCE) {
			this.intervalId = setTimeout(() => {
				this.tick();
				this.stop();
			}, this.interval);
		} else if(this.mode === EnumTickerMode.LOOP) {
			this.intervalId = setInterval(() => {
				this.tick();
			}, this.interval);
		}

		return this;
	}
	pause() {
		if(this.mode === EnumTickerMode.LOOP) {
			clearInterval(this.intervalId);
		}

		this.status = EnumTickerStatus.PAUSED;
		this.intervalId = null;

		return this;
	}
	resume() {
		if(this.mode === EnumTickerMode.LOOP) {
			this.intervalId = setInterval(() => {
				this.tick();
			}, this.interval);
		}

		this.status = EnumTickerStatus.RUNNING;

		return this;
	}
	stop() {
		if(this.mode === EnumTickerMode.ONCE) {
			clearTimeout(this.intervalId);
		} else if(this.mode === EnumTickerMode.LOOP) {
			clearInterval(this.intervalId);
		}

		this.status = EnumTickerStatus.STOPPED;
		this.intervalId = null;

		return this;
	}
	restart() {
		this.stop();
		this.start();

		return this;
	}

	tick(...args) {
		const dt = Date.now() - this.lastTick;
		const ip = dt / this.interval;
		this.lastTick = Date.now();
		this.tickCount++;

		this.listeners.forEach(listener => {
			listener({ dt, ip }, ...args);
		});

		return this;
	}
};

export default Ticker;