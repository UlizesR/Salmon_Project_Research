import { Vec2 } from "./Vectors";
import { Grid } from "./grid";

export class VectorField
{
    field: Vec2[][];

    constructor(public gridSize: number, public rows: number, public columns: number, public initialVec: Vec2)
    {
        this.rows = rows;
        this.columns = columns;
        this.initialVec = initialVec;
        this.field = this.createField();
    }

    createField(): Vec2[][]
    {
        let field: Vec2[][] = [];
        for (let i = 0; i < this.rows; i++)
        {
            field[i] = [];
            for (let j = 0; j < this.columns; j++)
            {
                field[i][j] = this.initialVec;
            }
        }
        return field;
    }

    setVec(i: number, j: number, vec: Vec2): void
    {
        this.field[i][j] = vec;
    }

    getVec(i: number, j: number): Vec2
    {
        return this.field[i][j];
    }

    drawVectors(ctx: CanvasRenderingContext2D, grid: Grid, x: number, y: number): void 
    {
        // init a line half the size of the grid box
        let line = grid.squareWidth / 2;
        let halfSquareWidth = grid.squareWidth / 2;
        let halfSquareHeight = grid.squareHeight / 2;

        // draw the vectors
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                // get the vector at the current grid point
                let vec = this.getVec(i, j);
                // normalize the vector
                let mag = vec.mag();
                if (mag > 0) {
                    vec = vec.div(mag);
                }

                // center the line in the grid box
                let xCenter = x + i * grid.squareWidth + halfSquareWidth;
                let yCenter = y + j * grid.squareHeight + halfSquareHeight;

                // calculate the position of the vector's head
                let headX = xCenter + vec.x * line;
                let headY = yCenter + vec.y * line;

                // draw the vector
                ctx.beginPath();
                ctx.moveTo(xCenter, yCenter+3);
                ctx.lineTo(headX, headY+3);
                ctx.stroke();

                // draw the vector's head as a triangle
                let angle = -Math.atan2(vec.y, vec.x);
                ctx.save();
                ctx.translate(headX, headY-3);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.moveTo(0, 0); // Move to the origin
                ctx.lineTo(-5, -2.5); // Draw the left side of the triangle
                ctx.lineTo(-5, 2.5); // Draw the right side of the triangle
                ctx.closePath(); // Close the path

                ctx.fillStyle = 'black';
                ctx.fill();
                ctx.restore();
            }
        }
    }
}