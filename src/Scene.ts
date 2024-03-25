// import { Grid } from './grid';
// import { VectorField } from './VectorField';

export class Scene
{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasBounds: DOMRect;
    width: number;
    height: number;
    // tooltip: HTMLDivElement;

    constructor()
    {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        if (!this.ctx) {
            throw new Error('Failed to get 2D context');
        }

        this.canvasBounds = this.canvas.getBoundingClientRect();
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // set ratio of canvas to screen

        // set the background color of the canvas to light blue
        this.ctx.fillStyle = 'lightblue';
        this.ctx.fillRect(0, 0, this.width, this.height);


        // // Initialize tooltip
        // this.tooltip = document.createElement('div');
        // this.setupTooltip();
    }

    // setupTooltip()
    // {
    //     this.tooltip.style.position = 'absolute';
    //     this.tooltip.style.flexDirection = 'column';
    //     this.tooltip.style.alignItems = 'center';
    //     this.tooltip.style.justifyContent = 'center';
    //     this.tooltip.style.backgroundColor = 'white';
    //     this.tooltip.style.border = '2px solid black';
    //     this.tooltip.style.padding = '8px';
    //     this.tooltip.style.display = 'none';
    //     this.tooltip.style.width = '200px';
    //     this.tooltip.style.height = '200px';
    //     document.body.appendChild(this.tooltip);
    // }
}