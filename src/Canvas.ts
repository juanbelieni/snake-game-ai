export enum Color {
  SNAKE = '#F1F1F1',
  FOOD = '#EE5555',
}

export default class Canvas {
  private readonly ctx: CanvasRenderingContext2D;

  constructor(
    private readonly width: number,
    private readonly height: number,
    private readonly size: number = 10,
  ) {
    const element = document.querySelector('canvas#root') as HTMLCanvasElement;
    element.width = this.width * this.size;
    element.height = this.height * this.size;

    this.ctx = element.getContext('2d');
  }

  clean() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width * this.size, this.height * this.size);
  }

  draw(i: number, j: number, color: Color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(i * this.size, j * this.size, this.size, this.size);
  }
}
