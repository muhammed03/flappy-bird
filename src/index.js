import "./index.html";
import "./index.scss";

// const game = new Game();
import game from "./components/Game/game";
// запускаем подготовку и после неё запуститься игра
game.prepare().then(() => {
    game.preview();
});
