import { Behaviour } from "./behaviour"
import { sqMagnitude, subPoints } from "../util";

export class WanderBehaviour extends Behaviour {

    constructor(controller, entity) {
        super(controller, entity);
        this.goal = null;
    }

    update(dt) {
        if (!this.goal && this.controller.random.bool(0.03)) {
            const wanderDist = 60;
            this.goal = {
                x: this.entity.position.x + this.controller.random.real(-wanderDist, wanderDist),
                y: this.entity.position.y + this.controller.random.real(-wanderDist, wanderDist),
            }
        }

        if (this.goal) {
            const goalDiff = subPoints(this.goal, this.entity.position);
            if (sqMagnitude(goalDiff) < 0.1) {
                this.goal = null;
            }
            else {
                this.entity.accelInDir(goalDiff, dt)
            }
        }

        if (!this.goal) {
            this.entity.dampen(dt);
        }

        this.entity.applyVelocity(dt);
    }
}