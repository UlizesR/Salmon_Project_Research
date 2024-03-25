import { Scene } from './Scene';
import { RiverControls } from './RiverControls';
import { Salmanoid } from './Salmanoid';
import { Vec2 } from './Vectors';

let scene = new Scene();

let controls = new RiverControls();
controls.eventListener('click', () => {
    console.log('Input changed', controls.showGrid,controls.start);
});

let fish = new Salmanoid(new Vec2(100, 125));

fish.eventListener('input', () => {
    console.log(fish.length)
    fish.drawSalmanoid(scene.ctx);
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        fish.position.x += 10;
    } else if (e.key === 'ArrowLeft') {
        fish.position.x -= 10;
    }
    fish.drawSalmanoid(scene.ctx);
});

fish.drawSalmanoid(scene.ctx);
