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

    // start game
    start() {
        this._canvas.removeEventListener("click", this._canvasListener);

        this._lastUpdate = Date.now();

        this._loop();
    }

    preview() {
        this._canvasListener = () => {
            this.start();
        };

        this._canvas.addEventListener("click", this._canvasListener);
    }
}
export default new Game();