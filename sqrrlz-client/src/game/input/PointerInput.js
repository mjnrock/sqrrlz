import Bitwise from "../util/Bitwise";
import Identity from "../util/Identity";

import { Subscribable } from "./../util/Subscribable";

export class PointerInput extends Identity {
	static EnumEvents = {
		POINTER_DOWN: "PointerDown",
		POINTER_UP: "PointerUp",
		POINTER_MOVE: "PointerMove",
		POINTER_CONTEXT: "PointerContext",
	};
	static EnumKeyMask = {
		ALT: 1 << 0,
		CTRL: 1 << 1,
		SHIFT: 1 << 2,
	};

	constructor ({ id, tags = [], subscribers = [] } = {}) {
		super({ id, tags });

		Subscribable(this);

		this.subscribe(...subscribers);

		this.mask = 0;
	}

	attachListeners(...elements) {
		for(const element of elements) {
			element.addEventListener("pointerdown", this.onPointerDown);
			element.addEventListener("pointerup", this.onPointerUp);
			element.addEventListener("pointermove", this.onPointerMove);
			element.addEventListener("contextmenu", this.onPointerContext);
		}
	}
	detachListeners(...elements) {
		for(const element of elements) {
			element.removeEventListener("pointerdown", this.onPointerDown);
			element.removeEventListener("pointerup", this.onPointerUp);
			element.removeEventListener("pointermove", this.onPointerMove);
			element.removeEventListener("contextmenu", this.onPointerContext);
		}
	}

	updateModifiers(e) {
		const modifier = (e.shiftKey ? PointerInput.EnumKeyMask.SHIFT : 0) | (e.ctrlKey ? PointerInput.EnumKeyMask.CTRL : 0) | (e.altKey ? PointerInput.EnumKeyMask.ALT : 0);

		this.mask = Bitwise.add(this.mask, modifier);
	}

	onPointerDown = (e) => {
		e.preventDefault();

		this.updateModifiers(e);
		this.broadcast(PointerInput.EnumEvents.POINTER_DOWN, e);
	}
	onPointerUp = (e) => {
		e.preventDefault();

		this.updateModifiers(e);
		this.broadcast(PointerInput.EnumEvents.POINTER_UP, e);
	}
	onPointerMove = (e) => {
		e.preventDefault();

		this.updateModifiers(e);
		this.broadcast(PointerInput.EnumEvents.POINTER_MOVE, e);
	}

	onPointerContext = (e) => {
		e.preventDefault();

		this.updateModifiers(e);
		this.broadcast(PointerInput.EnumEvents.POINTER_CONTEXT, e);
	}
};

export default PointerInput;