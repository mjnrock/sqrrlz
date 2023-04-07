import { v4 as uuid } from "uuid";

export class Identity {
	constructor ({ id, tags = [] } = {}) {
		this.id = id || uuid();
		this.tags = new Set(tags);
	}

	addTag (...tags) {
		tags.forEach(tag => this.tags.add(tag));
	}
	removeTag (...tags) {
		tags.forEach(tag => this.tags.delete(tag));
	}
	hasTag (...tags) {
		return tags.every(tag => this.tags.has(tag));
	}

	toObject() {
		return {
			id: this.id,
			tags: Array.from(this.tags)
		};
	}
	toString() {
		return JSON.stringify(this.toObject());
	}
}

export default Identity;