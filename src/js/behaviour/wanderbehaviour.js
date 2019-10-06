import { Behaviour } from "./behaviour"
import { sqMagnitude, subPoints } from "../util";
import { GoalBehaviour } from "./goalbehaviour";

export class WanderBehaviour extends Behaviour {

    constructor(controller, entity) {
        super(controller, entity);
        this.goalBehaviour = null;
    }

    update(dt) {
        if (this.goalBehaviour) {
            this.goalBehaviour.update(dt);
            if (this.goalBehaviour.atGoal) {
                this.goalBehaviour = null;
            }
        }
        else {
            this.entity.dampen(dt);
            this.entity.applyVelocity(dt);
        }

        if (!this.goalBehaviour && this.controller.random.bool(0.03)) {
            const wanderDist = 60;
            const goal = {
                x: this.entity.position.x + this.controller.random.real(-wanderDist, wanderDist),
                y: this.entity.position.y + this.controller.random.real(-wanderDist, wanderDist),
            }
            this.goalBehaviour = new GoalBehaviour(this.controller, this.entity);
            this.goalBehaviour.goal = goal;
        }
    }
}