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
        // X coordinates of points on border pipes
        const pipeX1 = this._game._pipes.x;
        const pipeX2 = this._game._pipes.x + this._game._pipes.width;

        // Y coordinates of points on border pipes
        const topPipeY = this._game._pipes.y - 105;
        const botPipeY = this._game._pipes.y;

        // right point of bird
        const topRBirdX = this._game._bird.x + this._game._bird.width;
        const topRBirdY = this._game._bird.y; // same as topLBirdY

        const botRBirdX = this._game._bird.x + this._game._bird.width;
        const botRBirdY = this._game._bird.y + this._game._bird.height; // same as botLBirdY

        // left point of bird
        const topLBirdX = this._game._bird.x; // same as botLBirdX

        // bird ground collision condition
        const conditionForGround = this.y + this.height >= this._game.height;

        // collision condition of the bottom pipe with the bird's right point
        const conditionForBottomPipe_R = ((botRBirdX >= pipeX1) && (botRBirdX < pipeX2)) && (botRBirdY >= botPipeY);
        // collision condition of the bottom tube with the bird's left point
        const conditionForBottomPipe_L = ((topLBirdX >= pipeX1) && (topLBirdX < pipeX2)) && (botRBirdY >= botPipeY);
        // collision condition of the top pipe with the bird's right point
        const conditionForTopPipe_R = ((topRBirdX >= pipeX1) && (topRBirdX < pipeX2)) && (topRBirdY <= topPipeY);
        // collision condition of the top tube with the bird's left point
        const conditionForTopPipe_L = ((topLBirdX >= pipeX1) && (topLBirdX < pipeX2)) && (topRBirdY <= topPipeY);

        // general collision condition
        const conditionGeneral = conditionForBottomPipe_R
            || conditionForBottomPipe_L
            || conditionForTopPipe_R
            || conditionForTopPipe_L;

        // condition for the bird not to fly above the ceiling
        if (this.y < 0) {
            this.y = 0;
        }

        // condition for end game
        if (conditionGeneral) {
            this._game.gameOver();
        } else if (conditionForGround) {
            this._game.gameOver();
        }
    }

    // метод подлёта
    flap() {
        // this._game.audioFlap.play();
        this.speed = -this._flapSpeed;
    }
}
