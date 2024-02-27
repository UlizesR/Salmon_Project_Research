import { Scene } from './canvasSetup';
import { Grid  } from './grid';
import { VectorField } from './VectorField';
import { Controls } from './Controls';
import { Vec2 } from './Vectors';
import { Salmanoid } from './Salmanoid';

class Main {
    scene: Scene;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    grid: Grid;
    vfield: VectorField;
    controls: Controls;
    salmons: Salmanoid[] = [];

    constructor() {
        this.scene = new Scene();
        this.canvas = this.scene.canvas;
        this.ctx = this.scene.ctx;

        const RIVER_WIDTH = this.canvas.width / 3;
        const RIVER_HEIGHT = this.canvas.height;
        const RIVER_X = (this.canvas.width - RIVER_WIDTH) / 2;
        const RIVER_Y = 0;

        this.controls = new Controls(() => this.redraw(RIVER_X, RIVER_Y, RIVER_WIDTH, RIVER_HEIGHT));
        
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(RIVER_X, RIVER_Y, RIVER_WIDTH, RIVER_HEIGHT);
        
        const salmonX = RIVER_X + RIVER_WIDTH / 2;
        const salmonY = RIVER_Y + RIVER_HEIGHT / 2;
        const salmonSpeed = new Vec2(0, 11.47);
        this.salmons.push(new Salmanoid(new Vec2(salmonX, salmonY), 28, 4.37, 0.6, 0.096, salmonSpeed, 'prolonged'));
        
        const SQUARE_SIZE = 15;
        
        this.grid = new Grid(RIVER_WIDTH, RIVER_HEIGHT, SQUARE_SIZE);
        const initialVec = new Vec2(0, this.controls.riverSpeed);
        this.vfield = new VectorField(SQUARE_SIZE, this.grid.rows, this.grid.columns, initialVec);
        
        this.salmons.forEach(salmon => {
            // update salmon's speed based on the river's speed
            const speed = new Vec2(0, salmon.oSpeed.y - this.controls.riverSpeed);
            salmon.setSpeed(speed);
            salmon.drawSalmanoid(this.ctx);
            salmon.updateEnergeticsInfo();
        });
        
        this.controls.updateControls(this.vfield);
        this.MoveSalmon(RIVER_X, RIVER_Y, RIVER_WIDTH, RIVER_HEIGHT);

    }

    redraw(RIVER_X: number, RIVER_Y: number, RIVER_WIDTH: number, RIVER_HEIGHT: number) {
        this.ctx.clearRect(RIVER_X-10, RIVER_Y, RIVER_WIDTH + 20, RIVER_HEIGHT);
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(RIVER_X, RIVER_Y, RIVER_WIDTH, RIVER_HEIGHT);

        if (this.controls.showGrid) {
            this.grid.drawGrid(this.ctx, RIVER_X, RIVER_Y);
        }
        if (this.controls.showVectors) {
            this.vfield.drawVectors(this.ctx, this.grid, RIVER_X, RIVER_Y);
        }
        this.salmons.forEach(salmon => salmon.drawSalmanoid(this.ctx));
    }

    lastRedrawRequest: number | null = null;
    lastMousePosition: Vec2 | null = null;

    private MoveSalmon(RIVER_X: number, RIVER_Y: number, RIVER_WIDTH: number, RIVER_HEIGHT: number) 
    {
        this.canvas.addEventListener('mousemove', (event) => {
            const { clientX, clientY } = event;
            const mouseX = clientX - this.scene.canvasBounds.left;
            const mouseY = clientY - this.scene.canvasBounds.top;

            // Only update if the mouse has moved significantly
            if (this.lastMousePosition && Math.abs(this.lastMousePosition.x - mouseX) < 1 && Math.abs(this.lastMousePosition.y - mouseY) < 1) {
                return;
            }
            this.lastMousePosition = new Vec2(mouseX, mouseY);

            // mouse position relative to the river
            const relativeX = mouseX - RIVER_X;
            const relativeY = mouseY - RIVER_Y;
            // calculate which grid box the mouse is over
            const hoverRow = Math.floor(relativeX / this.grid.squareWidth);
            const hoverColumn = Math.floor(relativeY / this.grid.squareHeight);
            // get the vector at the highlighted grid point
            const vector = this.vfield.getVec(hoverRow, hoverColumn);

             if (mouseX > RIVER_X && mouseX <= RIVER_X + RIVER_WIDTH && mouseY >= RIVER_Y && mouseY <= RIVER_Y + RIVER_HEIGHT) 
             {
                this.salmons.forEach(salmon => {
                    const sy = Math.round((salmon.oSpeed.y - this.controls.riverSpeed)*100)/100;
                    const speed = new Vec2(0, sy);
                    // salmon's speed should be its original speed minus the river's speed
                    salmon.setSpeed(speed);
                    // calculate the center of the salmon
                    const salmonCenterX = mouseX - salmon.width / 2;
                    const salmonCenterY = mouseY - salmon.height / 2;
                    // update the salmon's position based on its speed
                    salmon.updateSalmanoid(salmonCenterX, salmonCenterY);
                    // update the salmon's energetics info
                    salmon.updateEnergeticsInfo();
                });
            }

            // Cancel the last redraw request and request a new one
            if (this.lastRedrawRequest !== null) {
                cancelAnimationFrame(this.lastRedrawRequest);
            }
            this.lastRedrawRequest = requestAnimationFrame(() => this.redraw(RIVER_X, RIVER_Y, RIVER_WIDTH, RIVER_HEIGHT));

            // show tooltip if showGrid is true
            if (this.controls.showGrid) 
            {
                this.showTooltip(relativeX, relativeY, hoverRow, hoverColumn, vector, clientX, clientY);
            } else {
                this.scene.tooltip.style.display = 'none';
            }
        });
    }

    showTooltip(relativeX: number, relativeY: number, hoverRow: number, hoverColumn: number, vector: Vec2, clientX: number, clientY: number)
    {
        this.scene.tooltip.style.display = 'flex';
        this.scene.tooltip.style.whiteSpace = 'pre'; // Add this line
    
        
        // update the tooltip position and content
        this.scene.tooltip.textContent = `position: (${relativeX}, ${relativeY})\n`; // Add newline character
        this.scene.tooltip.textContent += `Row: ${hoverRow}, Column: ${hoverColumn}\n`; // Add newline character
        this.scene.tooltip.textContent += `Speed: (${vector.x}, ${vector.y})\n`; // Add newline character
    
        // update the tooltip position and content
        this.scene.tooltip.style.left = `${clientX + 10}px`; // add a small offset
        if (clientY > this.canvas.height * 3 / 4) {
            this.scene.tooltip.style.top = `${clientY - this.scene.tooltip.offsetHeight}px`; // draw the tooltip above the mouse
        } else {
            this.scene.tooltip.style.top = `${clientY + 10}px`; // add a small offset
        }
    }
}

new Main();