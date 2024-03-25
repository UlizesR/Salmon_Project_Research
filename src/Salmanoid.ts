import { Vec2 } from './Vectors';
import data from './Salmanoid.json';

interface ModeData {
    a: number;
    b: number;
    c: number;
}

interface SpeciesData {
    [key: string]: {
        [key: string]: ModeData;
    };
}

const speciesData: SpeciesData = data;

export class Salmanoid {
    position: Vec2;
    speed: Vec2;
    length: number;
    a_val: number;
    b_val: number;
    c_val: number;
    stamina: number;

    swimMode: string;
    species: string;

    speciesSelect: HTMLSelectElement;
    swimModeSelect: HTMLSelectElement;
    lengthInput: HTMLInputElement;
    speedInput: HTMLInputElement;

    private speciesDict: { [key: number]: string } = {
        1: 'Steelhead',
        2: 'Rainbow',
        3: 'Chinook',
        4: 'Artic Char'
    };

    private swimModeDict: { [key: number]: string } = {
        1: 'Prolonged',
        2: 'Burst',
    };

    constructor(pos: Vec2)
    {
        this.position = pos;
        this.stamina = 100;
        
        this.speciesSelect = document.getElementById('FishSpecies') as HTMLSelectElement;
        this.swimModeSelect = document.getElementById('FishMode') as HTMLSelectElement;
        this.lengthInput = document.getElementById('FishLength') as HTMLInputElement;
        this.speedInput = document.getElementById('FishSpeed') as HTMLInputElement;


        this.length = Number(this.lengthInput.value);
        this.speed = new Vec2(0, Number(this.speedInput.value));

        this.species = this.speciesDict[Number(this.speciesSelect.value)];
        
        this.swimMode = this.swimModeDict[Number(this.swimModeSelect.value)];
        const speciesModes = speciesData[this.species];

        this.a_val = speciesModes[this.swimMode].a;
        this.b_val = speciesModes[this.swimMode].b;
        this.c_val = speciesModes[this.swimMode].c;
    }

    drawSalmanoid(ctx: CanvasRenderingContext2D) 
    {
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x - this.length / 3, this.position.y + this.length);
        ctx.lineTo(this.position.x + this.length / 3, this.position.y + this.length);
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    eventListener(eventName: string, callback: Function) {
        this.speciesSelect.addEventListener(eventName, () => {
            this.species = this.speciesDict[Number(this.speciesSelect.value)];
            callback();
        });

        this.swimModeSelect.addEventListener(eventName, () => {
            this.swimMode = this.swimModeSelect.value;
            callback();
        });

        this.lengthInput.addEventListener(eventName, () => {
            this.length = Number(this.lengthInput.value);
            callback();
        });

        this.speedInput.addEventListener(eventName, () => {
            this.speed.y = Number(this.speedInput.value);
            callback();
        });
    }


    // updateEnergeticsInfo(): void
    // {
    //     // update the energetics elements
    //     this.staminaH1.innerHTML = `Stamina: ${this.stamina} %`;
    //     this.velH1.innerHTML = `Velocity: ${this.speed.y} ft/s`;
    //     this.swimTimeH1.innerHTML = `Swim Time: ${this.swimTime()} s`;
    // }

    updateSalmanoid(posX: number, posY: number): void
    {
        this.position.x = posX;
        this.position.y = posY;
    }

    setSpeed(speed: Vec2): void
    {
        this.speed = speed;
    }

    swimTime(): number
    {
        return (((this.length^this.b_val) * this.a_val)/this.speed.y)^(1/this.c_val);
    }
}