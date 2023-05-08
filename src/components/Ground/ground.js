import Base from "../Base/Base";

export default class Ground extends Base {
    constructor(params) {
        super(params);
        this._index = 0;
        this._SPEEDGAME = params.speedGame;
    }

    draw() {
        // number that just increments
        this._index += 0.3;

        // x-axis displacement in px
        const backgroundX = -((this._index * this._SPEEDGAME) % this.width);

        this._spriteSheet.then(sprites => {
            // right part
            this._drawEngine.drawImage({
                spriteSheet: sprites,
                image: this._frames[this._frameIndex],
                x: backgroundX + this.width, // backgroundX is subtracted from the entire width (remainder)
                y: this.y,
                width: this.width,
                height: this.height
            });

            // left part
            this._drawEngine.drawImage({
                spriteSheet: sprites,
                image: this._frames[this._frameIndex],
                x: backgroundX, // what has managed to be drawn and goes beyond the visibility zone
                y: this.y,
                width: this.width,
                height: this.height
            });
        });
    }
}
