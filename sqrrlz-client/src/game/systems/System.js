import Observable from "../util/Observable";

export class System extends Observable {
	constructor ({ id, tags = [], state = {}, observers = [], ...props } = {}) {
		super({ id, tags, state, observers });

		for(const [ key, value ] of Object.entries(props)) {
			this[ key ] = value;
		}
	}
}