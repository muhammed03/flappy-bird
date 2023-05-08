import Config from "../../constants/config";

import CanvasDrawEngine from "../../utils/drawEngine";
import ResourceLoader from "../../utils/resources";
import { RESOURCE_TYPE } from "../../utils/resources";

class Game {
    constructor() {
        // config
        this._config = Config;

        this._canvasListener = null;

        // canvas
        this._canvas = document.getElementById(this._config.canvas.canvasId);
        this._restartBtn = document.getElementById(this._config.canvas.restartBtnId);
        this._canvas.width = this._config.canvas.width;
        this._canvas.height = this._config.canvas.height;

        // size of the game
        this.height = this._config.canvas.height;
        this.width = this._config.canvas.width;

        // rating
        this._score = 0;
        this._record = !localStorage.getItem("record") ? 0 : localStorage.getItem("record");

        this._drawEngine = CanvasDrawEngine({ canvas: this._canvas });
        this._resourceLoader = ResourceLoader;
    }

    // method to be called before starting the game
    async prepare() {
        this._spriteSheet = this._resourceLoader.load({
            type: RESOURCE_TYPE.IMAGE,
            src: this._config.spritesheet.src,
            width: this._config.spritesheet.width,
            height: this._config.spritesheet.height
        });
    }

    draw() {
        // set the drawing order
        this._back.draw();
    }

    _loop() {
        const now = Date.now();

        if (this._playing) {
            // before drawing, you need to clear the canvas
            this._drawEngine.clear();

            // after the update, you need to draw all the components
            this.draw();

            // last update time
            this._lastUpdate = now;

            // run the loop
            requestAnimationFrame(this._loop.bind(this));
        }
    }

    // start game
    start() {
        this._canvas.removeEventListener("click", this._canvasListener);

        this._playing = true;

        // control game
        // this._inputHandler.subscribe();

        this._lastUpdate = Date.now();

        // run a loop with drawing entities and create a score counter
        // this.createCounter();
        this._loop();
    }

    preview() {
        // this.reset();

        this._canvasListener = () => {
            this.start();
        };

        this._canvas.addEventListener("click", this._canvasListener);
    }
}
export default new Game();
