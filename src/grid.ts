export class Grid 
{
    grid: string[][];
    squareWidth: number;
    squareHeight: number;
    rows: number;
    columns: number;

    constructor(public width: number, public height: number, public squareSize: number)
    {
        // calculate the number of squares that can fit into the width and height
        this.rows = Math.round(width / squareSize);
        this.columns = Math.round(height / squareSize);
        // recalculate SQUARE_SIZE based on the rounded values
        this.squareWidth = width / this.rows;
        this.squareHeight = height / this.columns;
        // create the grid
        this.grid = this.createGrid(this.rows, this.columns);

    }

    createGrid(rows: number, columns: number): string[][]
    {
        let grid: string[][] = [];
        // store the position of the squares in the grid
        for (let row = 0; row < rows; row++) {
            grid[row] = [];
            for (let column = 0; column < columns; column++) {
                grid[row][column] = 'rgba(0,0,0,0)';
            }
        }
        return grid;
    }

    drawGrid(ctx: CanvasRenderingContext2D, RIVER_X: number, RIVER_Y: number): void
    {
        // draw the boundary of the grid
        ctx.beginPath();

        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                // set the fill color from the grid array
                ctx.fillStyle = this.grid[row][column];
                // draw a filled rectangle
                ctx.fillRect(RIVER_X + row * this.squareWidth, RIVER_Y + column * this.squareHeight, this.squareWidth, this.squareHeight);
                // draw a black border around the rectangle
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(RIVER_X + row * this.squareWidth, RIVER_Y + column * this.squareHeight, this.squareWidth, this.squareHeight);
            }
        }
    }

    // update the grid with the highlighted square
    // this function is called when the mouse moves over the grid
    updateGrid(ctx: CanvasRenderingContext2D, RIVER_X: number, RIVER_Y: number): void
    {
        // clear the grid and redraw it
    
        // clear the grid
        ctx.clearRect(RIVER_X, RIVER_Y, this.width, this.height);
    
        // redraw the river
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(RIVER_X, RIVER_Y, this.width, this.height);
        
        // create a new grid
        this.grid = this.createGrid(this.rows, this.columns);
        
        // draw the grid
        this.drawGrid(ctx, RIVER_X, RIVER_Y);
    }

    highlightSquare(ctx: CanvasRenderingContext2D, RIVER_X: number, RIVER_Y: number, highlightedRow: number, highlightedColumn: number): void
    {
        // clear the grid and redraw it
    
        // clear the grid
        ctx.clearRect(RIVER_X, RIVER_Y, this.width, this.height);
    
        // redraw the river
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(RIVER_X, RIVER_Y, this.width, this.height);
        
        // create a new grid
        this.grid = this.createGrid(this.rows, this.columns);
        
        // set the fill color of the highlighted square
        this.grid[highlightedRow][highlightedColumn] = 'yellow';
        
        // draw the grid
        this.drawGrid(ctx, RIVER_X, RIVER_Y);
    }
}