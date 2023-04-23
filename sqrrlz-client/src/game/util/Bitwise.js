export function add(base, flag) {
	return base | flag;
};

export function addMany(base, ...flags) {
	for(const flag of flags) {
		base |= flag;
	}

	return base;
};

export function remove(base, flag) {
	return base & ~flag;
};

export function removeMany(base, ...flags) {
	for(const flag of flags) {
		base &= ~flag;
	}

	return base;
};

export function has(base, flag) {
	return (base & flag) === flag;
};

export function hasAny(base, ...flags) {
	for(const flag of flags) {
		if((base & flag) === flag) {
			return true;
		}
	}

	return false;
};

export function hasAll(base, ...flags) {
	for(const flag of flags) {
		if((base & flag) !== flag) {
			return false;
		}
	}

	return true;
};

export function toggle(base, flag) {
	return base ^ flag;
};

export function toggleMany(base, ...flags) {
	for(const flag of flags) {
		base ^= flag;
	}

	return base;
};

export default {
	add,
	addMany,
	remove,
	removeMany,
	has,
	hasAny,
	hasAll,
	toggle,
	toggleMany,
};