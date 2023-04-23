import Identity from "./Identity";
import { Registry } from "./Registry";

export class Observable extends Identity {
	static Registry = new Registry();
	static Observe = false;

	constructor ({ id, tags = [], state = {}, observers = [] } = {}) {
		super({ id, tags });

		this.state = new Map();
		this.observers = new Set();

		for(const [ key, value ] of Object.entries(state)) {
			this.set(key, value);
		}

		this.observe(...observers);

		if(Observable.Observe === true) {
			Observable.Registry.add(this);
		}
	}

	*[ Symbol.iterator ]() {
		for(const [ key, value ] of this.state) {
			yield [ key, value ];
		}
	}

	get(comp) {
		return this.state.get(comp);
	}

	has(comp) {
		return this.state.has(comp);
	}

	set(comp, value) {
		const oldValue = this.state.get(comp);

		this.state.set(comp, value);

		this.signal({ type: "set", prop: comp, current: oldValue, next: value });

		return this;
	}
	merge(comp, value) {
		const oldValue = this.state.get(comp);

		this.state.set(comp, { ...oldValue, ...value });

		this.signal({ type: "merge", prop: comp, current: oldValue, next: value });

		return this;
	}
	delete(comp) {
		const oldValue = this.state.get(comp);

		this.state.delete(comp);

		this.signal({ type: "delete", prop: comp, current: oldValue, next: undefined });

		return this;
	}

	observe(...observers) {
		for(const observer of observers) {
			this.observers.add(observer);
		}

		return this;
	}
	unobserve(...observers) {
		for(const observer of observers) {
			this.observers.delete(observer);
		}

		return this;
	}
	signal({ type, prop, current, next }) {
		for(const observer of this.observers) {
			observer({ target: this, type, prop, current, next });
		}

		return this;
	}

	toObject(...args) {
		return {
			...super.toObject(...args),
			state: Object.fromEntries(this.state),
		};
	}
	toString(...args) {
		return JSON.stringify(this.toObject(...args));
	}
};

export default Observable;