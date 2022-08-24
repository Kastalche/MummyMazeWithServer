export class Tile {
    x: number;
    y: number;
    obstacles: Array<number>;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
