import { validate, v4 as uuid } from "uuid";
import Identity from "./Identity";

export class Registry extends Identity {
	constructor ({ entries = [], id, tags = [] } = {}) {
		super({ id, tags });

		this._registry = new Map();

		this.registerMany(...entries);

		return new Proxy(this, {
			get: (target, prop) => {
				if(prop in target) {
					return target[ prop ];
				} else {
					const value = target.get(prop);

					if(Array.isArray(value)) {
						/* Pool */
						return value.map(v => target[ v ]);
					} else if(value.length === 36 && validate(value)) {
						/* Alias */
						return target[ value ];
					} else {
						/* Entry */
						return value;
					}
				}
			},
		});
	}

	register(entry) {
		if(typeof entry === "object" && !this.has(entry.id)) {
			this._registry.set(entry.id, entry);

			if(entry instanceof Identity) {
				entry.tags.forEach((value, key) => {
					this.addToPool(key, entry.id)
				});
			}

			return entry.id;
		} else {
			const id = uuid();

			this._registry.set(id, entry);

			return id;
		}
	}
	registerMany(...entries) {
		return entries.map(entry => this.register(entry));
	}
	unregister(entryOrId) {
		if(typeof entryOrId === "object" && entryOrId.id) {
			this._registry.delete(entryOrId.id);
		} else {
			this._registry.delete(entryOrId);
		}
	}
	unregisterMany(...entriesOrIds) {
		entriesOrIds.forEach(entryOrId => this.unregister(entryOrId));
	}

	addAlias(id, ...aliases) {
		aliases.forEach(alias => this._registry.set(alias, id));
	}
	registerAliased(entry, ...aliases) {
		const id = this.register(entry);

		this.addAlias(id, ...aliases);

		return id;
	}
	registerManyAliased(aliasObj = {}) {
		for(const [ alias, entry ] of Object.entries(aliasObj)) {
			this.registerAliased(entry, alias);
		}
	}
	removeAlias(...aliases) {
		aliases.forEach(alias => this._registry.delete(alias));
	}

	addToPool(name, ...entryAliasIds) {
		const ids = this._registry.get(name) || [];

		entryAliasIds.forEach(entry => {
			if(typeof entry === "object" && entry.id) {
				ids.push(entry.id);
			} else if(entry.length === 36 && validate(entry)) {
				ids.push(entry);
			} else {
				const id = this._registry.get(entry);

				if(id.length === 36 && validate(id)) {
					ids.push(id);
				}
			}
		});

		this._registry.set(name, ids);
	}
	getPools(isUnion = true, ...pools) {
		const ids = new Set();

		for(const pool of pools) {
			const poolIds = [ ...this._registry.get(pool) ];

			if(Array.isArray(poolIds)) {
				if(isUnion) {
					poolIds.forEach(id => ids.add(id));
				} else {
					poolIds.forEach(id => ids.delete(id));
				}
			}
		}

		return Array.from(ids);
	}
	removePool(name) {
		return this._registry.delete(name);
	}
	removeFromPool(name, ...entriesOrAliases) {
		const ids = this._registry.get(name);

		if(!Array.isArray(ids)) {
			return false;
		}

		for(const input of entriesOrAliases) {
			if(input.length === 36 && validate(input)) {
				/* Id */
				const index = ids.indexOf(input);

				if(index !== -1) {
					ids.splice(index, 1);
				}
			} else if(typeof input === "object" && input.id) {
				/* Entry */
				const index = ids.indexOf(input.id);

				if(index !== -1) {
					ids.splice(index, 1);
				}
			} else {
				/* Alias */
				const id = this._registry.get(input);

				if(id) {
					const index = ids.indexOf(id);

					if(index !== -1) {
						ids.splice(index, 1);
					}
				}
			}
		}

		if(ids.length === 0) {
			this._registry.delete(name);
		}

		return true;
	}

	union(...registries) {
		const entries = [];

		registries.forEach(registry => {
			registry._registry.forEach(entry => entries.push(entry));
		});

		return new Registry({ entries });
	}
	intersect(...registries) {
		const entries = [];

		registries.forEach(registry => {
			registry._registry.forEach(entry => {
				if(this.has(entry.id)) {
					entries.push(entry);
				}
			});
		});

		return new Registry({ entries });
	}
};