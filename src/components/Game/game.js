import Config from "../../constants/config";
// !!! import as separate image
import spritesheet from "../../images/spritesheet.png";

import Back from "../Back/Back";
import Bird from "../Bird/Bird";
import Ground from "../Ground/Ground";
import Pipes from "../Pipes/Pipes";
import GameOverWords from "../GameOverWords/GameOverWords";
import StartWords from "../StartWords/StartWords";
import TapImg from "../TapImg/TapImg";
import GameOverDesk from "../GameOverDesk/GameOverDesk";

import CanvasDrawEngine from "../../utils/drawEngine";
import PhysicsEngine from "../../utils/physicsEngine";
import ResourceLoader from "../../utils/resources";
import { RESOURCE_TYPE } from "../../utils/resources";
import MouseInputHandler from "../../utils/inputHandlers";

import audioFlap from "../../audio/audio_sfx_flap.wav";
import audioHit from "../../audio/audio_sfx_hit.wav";
import audioDie from "../../audio/audio_sfx_die.wav";
import audioPoint from "../../audio/audio_sfx_point.wav";

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

        // sounds of the game
        this.audioHit = new Audio();
        this.audioHit.src = audioHit;

        this.audioFlap = new Audio();
        this.audioFlap.src = audioFlap;

        this.audioPoint = new Audio();
        this.audioPoint.src = audioPoint;

        this.audioDie = new Audio();
        this.audioDie.src = audioDie;

        // rating
        this._score = 0;
        this._record = !localStorage.getItem("record") ? 0 : localStorage.getItem("record");

        this._drawEngine = new CanvasDrawEngine({ canvas: this._canvas });
        this._physicsEngine = new PhysicsEngine({ gravity: this._config.gravity });
        this._resourceLoader = new ResourceLoader();
        this._inputHandler = new MouseInputHandler({
            left: () => {
                this._bird.flap();
            },
            spacebar: () => {
                this._bird.flap();
            }
        });
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

    // initial rendering of game entities and reset of parameters
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

        // create a bird entity
        // {x, y, width, heigth, frames, spriteSheet, flapSpeed, physicsEngine, drawEngine, game}
        this._bird = new Bird({
            x: this._config.bird.x,
            y: this._config.bird.y,
            width: this._config.bird.width,
            height: this._config.bird.height,
            frames: this._config.bird.frames,
            spriteSheet: this._spriteSheet,
            flapSpeed: this._config.bird.flapSpeed,
            physicsEngine: this._physicsEngine,
            drawEngine: this._drawEngine,
            game: this
        });

        this._ground = new Ground({
            x: this._config.ground.x,
            y: this._config.ground.y,
            width: this._config.ground.width,
            height: this._config.ground.height,
            frames: this._config.ground.frames,
            spriteSheet: this._spriteSheet,
            speedGame: this._config.speedGame,
            drawEngine: this._drawEngine,
            game: this
        });

        this._pipes = new Pipes({
            x: this._config.pipes.x,
            y: this._config.pipes.y,
            width: this._config.pipes.width,
            height: this._config.pipes.height,
            frames: this._config.pipes.frames,
            spriteSheet: this._spriteSheet,
            speedGame: this._config.speedGame,
            drawEngine: this._drawEngine,
            game: this,
            spacePipe: this._config.spacePipe,
            index: 0
        });

        this._gameOverWords = new GameOverWords({
            x: this._config.interfaces.gameOverWords.x,
            y: this._config.interfaces.gameOverWords.y,
            width: this._config.interfaces.gameOverWords.width,
            height: this._config.interfaces.gameOverWords.height,
            frames: this._config.interfaces.gameOverWords.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            game: this
        });

        this._startWords = new StartWords({
            x: this._config.interfaces.startWords.x,
            y: this._config.interfaces.startWords.y,
            width: this._config.interfaces.startWords.width,
            height: this._config.interfaces.startWords.height,
            frames: this._config.interfaces.startWords.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            game: this
        });

        this._tapImg = new TapImg({
            x: this._config.interfaces.tapImg.x,
            y: this._config.interfaces.tapImg.y,
            width: this._config.interfaces.tapImg.width,
            height: this._config.interfaces.tapImg.height,
            frames: this._config.interfaces.tapImg.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            game: this
        });

        this._gameOverDesk = new GameOverDesk({
            x: this._config.interfaces.gameOverDesk.x,
            y: this._config.interfaces.gameOverDesk.y,
            width: this._config.interfaces.gameOverDesk.width,
            height: this._config.interfaces.gameOverDesk.height,
            frames: this._config.interfaces.gameOverDesk.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            game: this,

            scoresX: this._config.interfaces.gameOverDesk.scoresX,
            scoresY: this._config.interfaces.gameOverDesk.scoresY,

            recordX: this._config.interfaces.gameOverDesk.recordX,
            recordY: this._config.interfaces.gameOverDesk.recordY,

            medalX: this._config.interfaces.gameOverDesk.medals.x,
            medalY: this._config.interfaces.gameOverDesk.medals.y,
            medalW: this._config.interfaces.gameOverDesk.medals.w,
            medalH: this._config.interfaces.gameOverDesk.medals.h,
            medalFrames: this._config.interfaces.gameOverDesk.medals.frames,

            recordForBronze: this._config.recordForBronze,
            recordForSilver: this._config.recordForSilver,
            recordForGold: this._config.recordForGold,
            recordForPlatinum: this._config.recordForPlatinum
        });
    }

    update(delta) {
        this._bird.update(delta);
        this._pipes.update(delta);
    }

    draw() {
        // set the drawing order
        this._back.draw();
        this._bird.draw();
        this._ground.draw();
        this._pipes.draw();
    }

    _loop() {
        // State update depends on delta
        // The more time has passed, the farther the bird will be
        // That is, we need to multiply our displacement by delta
        const now = Date.now();
        const delta = now - this._lastUpdate;

        // middle of pipe
        const pipesX1 = this._pipes.x + (this._pipes.width / 2);
        // update every time
        this.update(delta / 1000.0);
        const pipesX2 = this._pipes.x + (this._pipes.width / 2);

        const deltaPipesX = pipesX1 - pipesX2;
        this.updateCounter(deltaPipesX);

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

    // game counter
    createCounter() {
        this._counter = document.getElementById(this._config.canvas.counterId);
        this._counter.innerText = `${this._score}`;
        this._counter.style.display = "block";
    }

    updateCounter(deltaPipesX) {
        const range = deltaPipesX / 2;

        const conditionForIncrease = (this._bird.x + (this._bird.width / 2) - range) < this._pipes.x + (this._pipes.width / 2)
            && (this._bird.x + (this._bird.width / 2) + range) > this._pipes.x + (this._pipes.width / 2);

        if (conditionForIncrease) {
            this.audioPoint.play();
            ++this._score;
            this._counter.innerText = `${this._score}`;
        }
    }

    // start game
    start() {
        this._canvas.removeEventListener("click", this._canvasListener);
        this._canvas.removeEventListener("keydown", this._canvasListener);

        this._playing = true;

        // control game
        this._inputHandler.subscribe();

        this._lastUpdate = Date.now();

        // run a loop with drawing entities and create a score counter
        this.createCounter();
        this._loop();
    }

    gameOver() {
        this._drawEngine.clear();

        // save record
        if (this._score > this._record) {
            localStorage.setItem("record", this._score);
        }

        this._back.draw();
        this._gameOverWords.draw();
        this._gameOverDesk.draw();

        this._restartBtn.style.display = "block";
        this._counter.style.display = "none";

        this._restartBtn.addEventListener("click", () => {
            // reload page
            window.location.reload();
            this._restartBtn.style.display = "none";
        });

        this._playing = false;
    }

    preview() {
        this.reset();

        // first rendering of entities
        this._back.draw();
        this._startWords.draw();
        this._tapImg.draw();

        this._canvasListener = () => {
            this.start();
        };

        this._canvas.addEventListener("click", this._canvasListener);
        this._canvas.addEventListener("keydown", this._canvasListener);
    }
}
export default new Game();
