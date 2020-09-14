import Canvas, { Color } from './Canvas';
import Snake, { Direction } from './Snake';
import Position from './interfaces/position';

const FOOD_AMOUNT = 15;

export default class Game {
  private readonly canvas: Canvas;
  private snake: Snake;
  private foods: Position[] = [];
  public isOver = false;

  constructor(
    private readonly width: number,
    private readonly height: number,
    private readonly size: number = 10,
  ) {
    this.canvas = new Canvas(this.width, this.height, this.size);
    this.snake = new Snake(this.width, this.height);
    for (let i = 0; i < FOOD_AMOUNT; i += 1) {
      this.spawnFood();
    }
  }

  private setGameState(foods: Position[], snake: Snake) {
    this.foods = [...foods];
    this.snake = snake;
  }

  copy() {
    const newGame = new Game(this.width, this.height, this.size);
    newGame.setGameState(this.foods, this.snake.copy());
    return newGame;
  }

  step(spawnFood = true) {
    if (!this.eatFood()) {
      this.snake.move();
    } else {
      this.snake.growUp();
      spawnFood && this.spawnFood();
    }

    if (this.snake.isDead) {
      this.isOver = true;
    }
  }

  private drawSnake() {
    this.snake.body.forEach((position) =>
      this.canvas.draw(position.x, position.y, Color.SNAKE),
    );
  }

  private drawFoods() {
    this.foods.forEach((food) => this.canvas.draw(food.x, food.y, Color.FOOD));
  }

  private spawnFood() {
    const x = Math.floor(Math.random() * this.width);
    const y = Math.floor(Math.random() * this.height);
    if (
      this.foods.findIndex((food) => food.x === x && food.y === y) !== -1 ||
      this.snake.body.findIndex((part) => part.x === x && part.y === y) !== -1
    ) {
      this.spawnFood();
    } else {
      this.foods.push({ x, y });
    }
  }

  private eatFood() {
    const foodIndex = this.foods.findIndex((food) => this.snake.isEating(food));

    if (foodIndex !== -1) {
      this.foods.splice(foodIndex, 1);
      return true;
    }

    return false;
  }

  update() {
    if (!this.isOver) {
      this.step();
      this.canvas.clean();
      this.drawSnake();
      this.drawFoods();
    }
  }

  handleKeyPress(key: string) {
    switch (key) {
      case 'ArrowUp': {
        return this.snake.changeDirection(Direction.UP);
      }
      case 'ArrowRight': {
        return this.snake.changeDirection(Direction.RIGHT);
      }
      case 'ArrowDown': {
        return this.snake.changeDirection(Direction.DOWN);
      }
      case 'ArrowLeft': {
        return this.snake.changeDirection(Direction.LEFT);
      }
    }
  }

  get score() {
    return this.snake.isDead ? -1 : this.snake.bodyLength;
  }
}
