import * as PIXI from "pixi.js";

class SpriteSheet {
	constructor (tiles, frames) {
		// create a new PIXI.BaseTexture to hold the sprite sheet"s image data
		const baseTexture = new PIXI.BaseTexture(tiles[ 0 ].canvas);

		// create an array of PIXI.Texture objects for each frame in the sprite sheet
		const textures = frames.map((frame) => {
			const tile = tiles[ frame.index ];
			const texture = new PIXI.Texture(
				baseTexture,
				new PIXI.Rectangle(tile.x, tile.y, tile.width, tile.height),
			);
			return texture;
		});

		// create a new PIXI.AnimatedSprite object using the textures and frames
		this.sprite = new PIXI.AnimatedSprite(textures, false);
		this.sprite.animationSpeed = 0.1; // set the animation speed

		// play the animation
		this.sprite.play();
	}
};

export default SpriteSheet;