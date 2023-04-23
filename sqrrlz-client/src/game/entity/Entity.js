import { Observable } from "../util/Observable.js";

export class Entity extends Observable {
	constructor (components = [], { id, tags = [], observers = [], ...props } = {}) {
		super({ id, tags, observers });

		for(const component of components) {
			this.set(component.constructor, component);
		}

		for(const [ key, value ] of Object.entries(props)) {
			this[ key ] = value;
		}
	}
};

export default Entity;