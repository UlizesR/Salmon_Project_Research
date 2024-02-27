
export class Vec2
{
    constructor(public x: number, public y: number)
    {
        this.x = x;
        this.y = y;
    }

    add(v: Vec2): Vec2
    {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    sub(v: Vec2): Vec2
    {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    mult(n: number): Vec2
    {
        return new Vec2(this.x * n, this.y * n);
    }

    div(n: number): Vec2
    {
        return new Vec2(this.x / n, this.y / n);
    }

    mag(): number
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vec2
    {
        return this.div(this.mag());
    }

    rotate(angle: number): Vec2
    {
        return new Vec2(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
    }

    angle(): number
    {
        return Math.atan2(this.y, this.x);
    }

    copy(): Vec2
    {
        return new Vec2(this.x, this.y);
    }

    set(x: number, y: number): void
    {
        this.x = x;
        this.y = y;
    }

    equals(v: Vec2): boolean
    {
        return this.x === v.x && this.y === v.y;
    }

    static fromAngle(angle: number): Vec2
    {
        return new Vec2(Math.cos(angle), Math.sin(angle));
    }
}