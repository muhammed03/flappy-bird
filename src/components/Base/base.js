// The Base class contains a property and methods that are the same for all entities

export default class Base {
    constructor({ x, y, width, height, frames, spriteSheet, drawEngine, game }) {
        // public fields to be interacted with
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.falling = false;
        this.speed = 0;

        // protected fields that cannot be changed
        this._frames = frames; // array of multiple frames
        this._frameIndex = 0; // current frame
        this._spriteSheet = spriteSheet;
        this._drawEngine = drawEngine;
        this._game = game;
    }

    // draw method on canvas
    draw() {
        this._spriteSheet.then(sprites => {
            this._drawEngine.drawImage({
                spriteSheet: sprites,
                image: this._frames[this._frameIndex],
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            });
        });
    }

    update(delta) {
        // rewrite the frame every update cycle
        this._frameIndex = (this._frameIndex + Math.ceil(delta)) % this._frames.length;
    }
}
