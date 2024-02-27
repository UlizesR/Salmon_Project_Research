import { VectorField } from './VectorField';
import { Vec2 } from './Vectors';

export class Controls
{
    showGridControls: HTMLInputElement;
    showVectorsControls: HTMLInputElement;
    riverSpeedControls: HTMLInputElement;
    riverSpeedLabel: HTMLLabelElement;

    showGrid: boolean = false;
    showVectors: boolean = false;
    riverSpeed: number = 1;

    constructor(private redraw: () => void)
    {
        // get input elements
        this.showGridControls = document.getElementById('showGrid') as HTMLInputElement;
        this.showVectorsControls = document.getElementById('showVectors') as HTMLInputElement;
        this.riverSpeedControls = document.getElementById('riverSpeed') as HTMLInputElement;
        this.riverSpeedLabel = document.getElementById('riverSpeedLabel') as HTMLLabelElement;
    }

    updateControls(vecF: VectorField): void
    {
        // update the showGrid property based on the checkbox
        this.showGridControls.addEventListener('change', () => {
            this.showGrid = this.showGridControls.checked;
            console.log(this.showGrid);
            this.redraw();
        });

        // update the showVectors property based on the checkbox
        this.showVectorsControls.addEventListener('change', () => {
            this.showVectors = this.showVectorsControls.checked;
            this.redraw();
        });

        // update the riverSpeed property based on the range input
        this.riverSpeedControls.oninput = () => {
            this.riverSpeed = Number(this.riverSpeedControls.value);
            console.log(this.riverSpeed);
            // update the innerHTML of the riverSpeedControls
            this.riverSpeedLabel.innerHTML = `River Speed: ${this.riverSpeed} ft/s`;
            // update the vector field
            for (let i = 0; i < vecF.rows; i++) {
                for (let j = 0; j < vecF.columns; j++) {
                    vecF.setVec(i, j, new Vec2(0, this.riverSpeed));
                }
            }

            this.redraw();
        }
    }
}