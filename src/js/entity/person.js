import { Entity } from "./entity";
import { subPoints, normalisePoint, addPoints, clampMagnitude, multiplyPoint, sqMagnitude, sqDistBetween, clonePoint } from "../util";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";
import { House } from "./house";

export class Person extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
    }

    update(dt) {
        super.update(dt);
        if (this.controller.random.bool(0.1)) {
            const nearest = this.controller.getClosestEntity(this.position, e => e !== this);
            const sqDist = sqDistBetween(this.position, nearest.position);
            if (sqDist > 50 * 50) {
                const house = new House(this.controller);
                house.position = clonePoint(this.position);
                this.controller.newEntities.push(house);
            }
        }
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