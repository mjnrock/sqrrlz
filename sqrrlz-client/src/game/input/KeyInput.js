import Bitwise from "../util/Bitwise";
import Identity from "../util/Identity";

import { Subscribable } from "./../util/Subscribable";

export class KeyInput extends Identity {
	static EnumEvents = {
		KEY_DOWN: "KeyDown",
		KEY_UP: "KeyUp",
	};
	static EnumKeyMask = {
		ALT: 1 << 0,
		CTRL: 1 << 1,
		SHIFT: 1 << 2,
		UP: 1 << 3,
		DOWN: 1 << 4,
		LEFT: 1 << 5,
		RIGHT: 1 << 6,
		SPACE: 1 << 7,
	};

	constructor ({ id, tags = [], subscribers = [] } = {}) {
		super({ id, tags });

		Subscribable(this);

		this.subscribe(...subscribers);

		this.mask = 0;

		this.keyMap = new Map();
		this.keyMap.set("ArrowUp", KeyInput.EnumKeyMask.UP);
		this.keyMap.set("KeyW", KeyInput.EnumKeyMask.UP);
		this.keyMap.set("ArrowDown", KeyInput.EnumKeyMask.DOWN);
		this.keyMap.set("KeyS", KeyInput.EnumKeyMask.DOWN);
		this.keyMap.set("ArrowLeft", KeyInput.EnumKeyMask.LEFT);
		this.keyMap.set("KeyA", KeyInput.EnumKeyMask.LEFT);
		this.keyMap.set("ArrowRight", KeyInput.EnumKeyMask.RIGHT);
		this.keyMap.set("KeyD", KeyInput.EnumKeyMask.RIGHT);
		this.keyMap.set("Space", KeyInput.EnumKeyMask.SPACE);

		this.overrideSequences = [
			e => e.code === "F5",
			e => e.ctrlKey && e.code === "F5",
			e => e.code === "F11",
			e => e.code === "F12",
		];
	}

	has(flag) {
		return Bitwise.has(this.mask, flag);
	}

	attachListeners(...elements) {
		for(const element of elements) {
			element.addEventListener("keydown", this.onKeyDown);
			element.addEventListener("keyup", this.onKeyUp);
		}
	}
	detachListeners(...elements) {
		for(const element of elements) {
			element.removeEventListener("keydown", this.onKeyDown);
			element.removeEventListener("keyup", this.onKeyUp);
		}
	}

	updateModifiers(e) {
		const modifier = (e.shiftKey ? KeyInput.EnumKeyMask.SHIFT : 0) | (e.ctrlKey ? KeyInput.EnumKeyMask.CTRL : 0) | (e.altKey ? KeyInput.EnumKeyMask.ALT : 0);

		this.mask = Bitwise.add(this.mask, modifier);
	}

	onKeyDown = (e) => {
		if(this.overrideSequences.some(fn => fn(e))) {
			return;
		}

		e.preventDefault();

		this.updateModifiers(e);
		this.mask = Bitwise.add(this.mask, this.keyMap.get(e.code));

		this.broadcast(KeyInput.EnumEvents.KEY_DOWN, this.mask);
	}
	onKeyUp = (e) => {
		e.preventDefault();

		this.updateModifiers(e);
		this.mask = Bitwise.remove(this.mask, this.keyMap.get(e.code));

		this.broadcast(KeyInput.EnumEvents.KEY_UP, this.mask);
	}
};

export default KeyInput;