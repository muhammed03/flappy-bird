import Base from "../Base/Base";

export default class Bird extends Base {
    constructor(params) {
        super(params);
        this._flapSpeed = params.flapSpeed;
        this._physicsEngine = params.physicsEngine;
        this.falling = true;
    }

    // bird data update method
    update(delta) {
        super.update(delta);

        this._physicsEngine.update(this, delta);

        this.#crash();
    }

    #crash() {
        // bird ground collision condition
        // const conditionForGround = this.y + this.height >= this._game.height;

        // condition for the bird not to fly above the ceiling
        if (this.y < 0) {
            this.y = 0;
        }

        // condition for end game
        // if (conditionForGround) {
        //   this._game.gameOver();
        // }
    }

    // метод подлёта
    flap() {
        // this._game.audioFlap.play();
        this.speed = -this._flapSpeed;
    }
}