import Config from "../../constants/config";
import CanvasDrawEngine from "../../utils/drawEngine";
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
    }
}
export default new Game();
