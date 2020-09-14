import Position from './interfaces/position';

export enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

export default class Snake {
  public body: Position[] = [];
  private direction: Direction;

  constructor(private readonly width: number, private readonly height: number) {
    this.body.push({ x: 4, y: 4 });
    this.body.push({ x: 4, y: 5 });
    this.direction = Direction.RIGHT;
  }

  private setSnakeState(body: Position[], direction: Direction) {
    this.body = [...body];
    this.direction = direction;
  }

  copy() {
    const newSnake = new Snake(this.width, this.height);
    newSnake.setSnakeState(this.body, this.direction);
    return newSnake;
  }

  private get head() {
    return this.body[0];
  }

  private get ahead() {
    const ahead = { ...this.head };
    switch (this.direction) {
      case Direction.UP: {
        ahead.y -= 1;
        break;
      }
      case Direction.RIGHT: {
        ahead.x += 1;
        break;
      }
      case Direction.DOWN: {
        ahead.y += 1;
        break;
      }
      case Direction.LEFT: {
        ahead.x -= 1;
        break;
      }
    }
    return ahead;
  }

  private get isTouchingItself() {
    for (const part of this.body.slice(1)) {
      if (part.x === this.head.x && part.y === this.head.y) {
        return true;
      }
    }
    return false;
  }

  private get isTouchingWall() {
    if (
      this.head.x >= 0 &&
      this.head.x < this.width &&
      this.head.y >= 0 &&
      this.head.y < this.height
    ) {
      return false;
    }

    return true;
  }

  growUp() {
    switch (this.direction) {
      case Direction.UP: {
        this.body.unshift({ ...this.head, y: this.head.y - 1 });
        break;
      }
      case Direction.RIGHT: {
        this.body.unshift({ ...this.head, x: this.head.x + 1 });
        break;
      }
      case Direction.DOWN: {
        this.body.unshift({ ...this.head, y: this.head.y + 1 });
        break;
      }
      case Direction.LEFT: {
        this.body.unshift({ ...this.head, x: this.head.x - 1 });
        break;
      }
    }
  }

  move() {
    this.growUp();
    this.body.pop();
  }

  get isDead() {
    return this.isTouchingWall || this.isTouchingItself;
  }

  isEating(food: Position) {
    return this.ahead.x === food.x && this.ahead.y === food.y;
  }

  changeDirection(direction: Direction) {
    if (
      !(
        (direction === Direction.DOWN && this.direction === Direction.UP) ||
        (direction === Direction.UP && this.direction === Direction.DOWN) ||
        (direction === Direction.LEFT && this.direction === Direction.RIGHT) ||
        (direction === Direction.RIGHT && this.direction === Direction.LEFT)
      )
    ) {
      this.direction = direction;
      return true;
    }
    return false;
  }

  get bodyLength() {
    return this.body.length;
  }
}
