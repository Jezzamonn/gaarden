import { Entity } from "./entity";
import { subPoints, normalisePoint, addPoints, clampMagnitude, multiplyPoint, sqMagnitude } from "../util";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";

export class Person extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
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

        context.beginPath();
        context.arc(0, -15, 5, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }
}