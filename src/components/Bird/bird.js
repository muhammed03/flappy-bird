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
    }

    // метод подлёта
    flap() {
        this._game.audioFlap.play();
        this.speed = -this._flapSpeed;
    }
}