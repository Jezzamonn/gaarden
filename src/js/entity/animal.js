import { Entity } from "./entity";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";

export class Animal extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        this.debugName = 'animal';
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    localRender(context) {
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(-3, 0);
        context.lineTo(-3, -5);
        context.stroke();

        context.beginPath();
        context.moveTo(3, 0);
        context.lineTo(3, -5);
        context.stroke();

        context.beginPath();
        context.arc(0, -7, 5, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }
}