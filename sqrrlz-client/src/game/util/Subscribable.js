export const Subscribable = (target = {}) => {
	const obj = {
		subscribers: new Set(),
		subscribe(...subscribers) {
			for(const subscriber of subscribers) {
				this.subscribers.add(subscriber);
			}

			return this;
		},
		unsubscribe(...subscribers) {
			for(const subscriber of subscribers) {
				this.subscribers.delete(subscriber);
			}

			return this;
		},
		broadcast(...args) {
			for(const subscriber of this.subscribers) {
				subscriber(...args);
			}

			return this;
		},
	};

	Object.assign(target, obj);

	return target;
};

export default Subscribable;