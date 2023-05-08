import Config from "../../constants/config";
// !!! import as separate image
import spritesheet from "../../images/spritesheet.png";

import CanvasDrawEngine from "../../utils/drawEngine";
import ResourceLoader from "../../utils/resources";
import { RESOURCE_TYPE } from "../../utils/resources";

import Back from "../Back/Back";

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

        this._drawEngine = new CanvasDrawEngine({ canvas: this._canvas });
        this._resourceLoader = new ResourceLoader();
    }

    // method to be called before starting the game
    async prepare() {
        this._spriteSheet = this._resourceLoader.load({
            type: RESOURCE_TYPE.IMAGE,
            src: spritesheet,
            width: this._config.spritesheet.width,
            height: this._config.spritesheet.height
        });
    }

    // начальная отрисовка сущностей игры и сброс праметров
    reset() {
        this._back = new Back({
            x: this._config.back.x,
            y: this._config.back.y,
            width: this._config.back.width,
            height: this._config.back.height,
            frames: this._config.back.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            game: this
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
        this.reset();

        this._canvasListener = () => {
            this.start();
        };

        this._canvas.addEventListener("click", this._canvasListener);
    }
}
export default new Game();
