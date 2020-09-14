import Game from './Game';

const keys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
const MAX_DEPTH = 5;

function shuffle<T>(array: T[]) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export default class AI {
  constructor(private readonly game: Game) {}

  chooseKey(depth = 0) {
    if (this.game.isOver) {
      return;
    }
    let maxScore = 0;
    let bestKey: string = null;

    for (const key of shuffle(keys)) {
      const game = this.game.copy();
      game.handleKeyPress(key);
      game.step(false);
      let score = game.score;

      if (depth < MAX_DEPTH && !game.isOver) {
        const ai = new AI(game);

        const result = ai.chooseKey(depth + 1);
        score += result.maxScore;
      }

      if (score > maxScore) {
        maxScore = score;
        bestKey = key;
      }
    }

    return { bestKey, maxScore };
  }
}
