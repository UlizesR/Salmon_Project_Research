import { Vec2 } from './Vectors';


export class Salmanoid {
    position: Vec2;
    length: number;
    lengthIn: number;
    a: number;
    b: number;
    c: number;
    speed: Vec2;
    oSpeed: Vec2;
    swimMode: string = 'prolonged';
    species: string = 'salmonoid';
    stamina: number = 100;

    width: number = 0.5; // ft
    height: number = 0.5; // ft
    
    // h1 elements
    staminaH1: HTMLHeadingElement;
    velH1: HTMLHeadingElement;
    swimTimeH1: HTMLHeadingElement;
    
    constructor(pos: Vec2, length: number, a: number, b: number, c: number, speed: Vec2, swimMode: string, species: string = 'salmonoid')
    {
        const INCH_TO_FT = 1/12;
        this.position = pos;
        this.length = length * INCH_TO_FT;
        this.lengthIn = length;
        this.a = a;
        this.b = b;
        this.c = c;
        this.speed = speed;
        this.oSpeed = speed;
        this.swimMode = swimMode;
        this.species = species;

        // get the energetics elements of the salmonoid
        this.staminaH1 = document.getElementById('Stamina') as HTMLHeadingElement;
        this.velH1 = document.getElementById('Velocity') as HTMLHeadingElement;
        this.swimTimeH1 = document.getElementById('SwimTime') as HTMLHeadingElement;

        // set fish info 
        const fishLength = document.getElementById('FishLength') as HTMLHeadingElement;
        fishLength.innerHTML = `Fish Length: ${this.lengthIn} in`;
        const fishSpecies = document.getElementById('FishSpecies') as HTMLHeadingElement;
        fishSpecies.innerHTML = `Fish Species: ${this.species}`;

    }

    drawSalmanoid(ctx: CanvasRenderingContext2D) 
    {
        // draw a triangle to represent the salmonoid

        // calculate the width and height of the salmonoid

        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x - this.lengthIn / 3, this.position.y + this.lengthIn);
        ctx.lineTo(this.position.x + this.lengthIn / 3, this.position.y + this.lengthIn);
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    updateEnergeticsInfo(): void
    {
        // update the energetics elements
        this.staminaH1.innerHTML = `Stamina: ${this.stamina} %`;
        this.velH1.innerHTML = `Velocity: ${this.speed.y} ft/s`;
        this.swimTimeH1.innerHTML = `Swim Time: ${this.swimTime()} s`;
    }

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
        return (((this.length^this.b) * this.a)/this.speed.y)^(1/this.c)
    }
}