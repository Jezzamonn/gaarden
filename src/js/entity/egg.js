import { Entity } from "./entity";

export class Egg extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'egg';
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    localRender(context) {
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.lineWidth = 1;

        context.beginPath();
        context.arc(0, -10, 10, 0, Math.PI);
        context.ellipse(0, -10, 10, 20, 0, Math.PI, 2 * Math.PI)
        context.fill();
        context.stroke();
    }
}