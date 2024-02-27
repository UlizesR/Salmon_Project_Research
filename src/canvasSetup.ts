// import { Grid } from './grid';
// import { VectorField } from './VectorField';

export class Scene
{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasBounds: DOMRect;
    tooltip: HTMLDivElement;

    constructor()
    {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        if (!this.ctx) {
            throw new Error('Failed to get 2D context');
        }

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.canvasBounds = this.canvas.getBoundingClientRect();

        // Initialize tooltip
        this.tooltip = document.createElement('div');
        this.setupTooltip();
    }

    setupTooltip()
    {
        this.tooltip.style.position = 'absolute';
        this.tooltip.style.flexDirection = 'column';
        this.tooltip.style.alignItems = 'center';
        this.tooltip.style.justifyContent = 'center';
        this.tooltip.style.backgroundColor = 'white';
        this.tooltip.style.border = '2px solid black';
        this.tooltip.style.padding = '8px';
        this.tooltip.style.display = 'none';
        this.tooltip.style.width = '200px';
        this.tooltip.style.height = '200px';
        document.body.appendChild(this.tooltip);
    }
}