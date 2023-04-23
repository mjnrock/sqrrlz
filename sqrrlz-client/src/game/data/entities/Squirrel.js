import * as PIXI from "pixi.js";
import { Entity } from "./../../entity/Entity";

import { Transform } from "./../../entity/components/Transform";
import { Velocity } from "./../../entity/components/Velocity";
import { Sprite } from "./../../entity/components/Sprite";

export const components = [
	[ Transform, () => ({ speed: 65, x: Math.random() * 800, y: Math.random() * 800 }) ],
	[ Velocity, { x: 0, y: 0 } ],
	[ Sprite, { texture: PIXI.Texture.from("assets/images/squirrel.png") } ],
];

export function Create() {
	const entity = new Entity();

	for(const [ Component, ...args ] of components) {
		if(typeof args[ 0 ] === "function") {
			entity.set(Component, new Component(args[ 0 ]()));
		} else {
			entity.set(Component, new Component(...args));
		}
	}

	return entity;
};