import AI from './AI';
import Game from './Game';

const game = new Game(30, 30, 12);
const ai = new AI(game);

function loop() {
  const { bestKey } = ai.chooseKey();
  game.handleKeyPress(bestKey);
  game.update();
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);

// window.addEventListener('keydown', (event) => event.key === ' ' && loop());
// window.addEventListener('keydown', (event) => game.handleKeyPress(event.key));
