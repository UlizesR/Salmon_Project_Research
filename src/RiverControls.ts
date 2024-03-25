// import { VectorField } from './VectorField';
// import { Vec2 } from './Vectors';

// export class Controls
// {
//     showGridControls: HTMLInputElement;
//     showVectorsControls: HTMLInputElement;
//     riverSpeedControls: HTMLInputElement;
//     riverSpeedLabel: HTMLLabelElement;

//     showGrid: boolean = false;
//     showVectors: boolean = false;
//     riverSpeed: number = 1;

//     constructor(private redraw: () => void)
//     {
//         // get input elements
//         this.showGridControls = document.getElementById('showGrid') as HTMLInputElement;
//         this.showVectorsControls = document.getElementById('showVectors') as HTMLInputElement;
//         this.riverSpeedControls = document.getElementById('riverSpeed') as HTMLInputElement;
//         this.riverSpeedLabel = document.getElementById('riverSpeedLabel') as HTMLLabelElement;
//     }

//     updateControls(vecF: VectorField): void
//     {
//         // update the showGrid property based on the checkbox
//         this.showGridControls.addEventListener('change', () => {
//             this.showGrid = this.showGridControls.checked;
//             console.log(this.showGrid);
//             this.redraw();
//         });

//         // update the showVectors property based on the checkbox
//         this.showVectorsControls.addEventListener('change', () => {
//             this.showVectors = this.showVectorsControls.checked;
//             this.redraw();
//         });

//         // update the riverSpeed property based on the range input
//         this.riverSpeedControls.oninput = () => {
//             this.riverSpeed = Number(this.riverSpeedControls.value);
//             console.log(this.riverSpeed);
//             // update the innerHTML of the riverSpeedControls
//             this.riverSpeedLabel.innerHTML = `River Speed: ${this.riverSpeed} ft/s`;
//             // update the vector field
//             for (let i = 0; i < vecF.rows; i++) {
//                 for (let j = 0; j < vecF.columns; j++) {
//                     vecF.setVec(i, j, new Vec2(0, this.riverSpeed));
//                 }
//             }

//             this.redraw();
//         }
//     }
// }


export class RiverControls
{
    speed: number;
    depth: number;

    speedInput: HTMLInputElement;
    depthInput: HTMLInputElement;
    showGridInput: HTMLInputElement;
    showVectorsInput: HTMLInputElement;
    drawObstaclesInput: HTMLInputElement;
    startInput: HTMLInputElement;
    resetInput: HTMLInputElement;

    showGrid: boolean;
    showVectors: boolean;
    drawObstacles: boolean;

    start: boolean;
    reset: boolean;

    constructor()
    {
        this.speedInput = document.getElementById('RiverSpeed') as HTMLInputElement;
        this.depthInput = document.getElementById('RiverDepth') as HTMLInputElement;
        this.showGridInput = document.getElementById('ShowGrid') as HTMLInputElement;
        this.showVectorsInput = document.getElementById('ShowVectors') as HTMLInputElement;
        this.drawObstaclesInput = document.getElementById('DrawObstacles') as HTMLInputElement;
        this.startInput = document.getElementById('start') as HTMLInputElement;
        this.resetInput = document.getElementById('reset') as HTMLInputElement;

        this.speed = Number(this.speedInput.value);
        this.depth = Number(this.depthInput.value);

        this.start = false;
        this.reset = false;
        this.showGrid = false;
        this.showVectors = false;
        this.drawObstacles = false;
    }

    eventListener(eventName: string, callback: Function) {
        this.speedInput.addEventListener(eventName, () => {
            this.speed = Number(this.speedInput.value);
            callback();
        });
    
        this.depthInput.addEventListener(eventName, () => {
            this.depth = Number(this.depthInput.value);
            callback();
        });
    
        this.showGridInput.addEventListener(eventName, () => {
            this.showGrid = this.showGridInput.checked;
            callback();
        });
    
        this.showVectorsInput.addEventListener(eventName, () => {
            this.showVectors = this.showVectorsInput.checked;
            callback();
        });
    
        this.drawObstaclesInput.addEventListener(eventName, () => {
            this.drawObstacles = this.drawObstaclesInput.checked;
            callback();
        });

        this.startInput.addEventListener(eventName, () => {
            this.start = !this.start;
            callback();
        });

        this.resetInput.addEventListener(eventName, () => {
            this.reset = !this.reset;
            callback();
        });
    }
}