import Base from "../Base/Base";

export default class Pipes extends Base {
    constructor(params) {
        super(params);
        this._SPEEDGAME = params.speedGame;

        // variable for x-coordinate calculation
        this._index = params.index;

        // bottom pipe tall range
        this._minTallBottomPipe = 300;
        this._maxTallBottomPipe = 140;

        this._spacePipe = this.height + params.spacePipe;
    }

    update(delta) {
        this._index += 45 * delta;

        // x-coordinate calculation
        this.x = (-(((this._index * this._SPEEDGAME) % this._game.width) * ((this._game.width + this.width) / this._game.width))) + this._game.width;

        // y-coordinate calculation
        if (this.x > (this._game.width - 1) || this.x < -this.width) {
            this.y = this._minTallBottomPipe + Math.random() * (this._maxTallBottomPipe + 1 - this._minTallBottomPipe);
        }
    }

    draw() {
        this._spriteSheet.then(sprites => {
            this._drawEngine.drawImage({
                spriteSheet: sprites,
                image: this._frames[0],
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            });
            this._drawEngine.drawImage({
                spriteSheet: sprites,
                image: this._frames[1],
                x: this.x,
                y: this.y - this._spacePipe,
                width: this.width,
                height: this.height
            });
        });
    }
}
