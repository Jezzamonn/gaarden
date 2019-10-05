import { Entity } from "./entity";
import { subPoints, normalisePoint, addPoints, clampMagnitude, multiplyPoint, sqMagnitude } from "../util";

export class Person extends Entity {

    constructor(controller) {
        super(controller);
        this.velocity = {x: 0, y: 0};
        this.maxSpeed = 20;
        this.accel = 0.2;
        this.damp = 0.9;
        this.goal = null;
    }

    update(dt) {
        if (!this.goal && this.controller.random.bool(0.03)) {
            const wanderDist = 60;
            this.goal = {
                x: this.position.x + this.controller.random.real(-wanderDist, wanderDist),
                y: this.position.y + this.controller.random.real(-wanderDist, wanderDist),
            }
        }

        if (this.goal) {
            const goalDiff = subPoints(this.goal, this.position);
            if (sqMagnitude(goalDiff) < 0.1) {
                this.goal = null;
            }
            else {
                const accelVec = multiplyPoint(this.accel, normalisePoint(goalDiff));
                this.velocity = clampMagnitude(addPoints(accelVec, this.velocity), dt * this.maxSpeed)
            }
        }

        if (!this.goal) {
            this.velocity = multiplyPoint(this.damp, this.velocity);
        }

        this.position = addPoints(this.position, this.velocity);
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