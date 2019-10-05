import { Entity } from "./entity";

export class House extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'house';
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    localRender(context) {
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(-10, 0);
        context.lineTo(-10, -20);
        context.stroke();

        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(10, -20);
        context.stroke();

        context.beginPath();
        context.moveTo(-15, -20);
        context.lineTo(0, -30);
        context.lineTo(15, -20);
        context.stroke();
    }
}