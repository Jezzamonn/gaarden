import { Behaviour } from "./behaviour"
import { sqMagnitude, subPoints } from "../util";

export class GoalBehaviour extends Behaviour {

    constructor(controller, entity) {
        super(controller, entity);
        this.goal = null;
        this.atGoal = false;
    }

    update(dt) {
        const goalDiff = subPoints(this.goal, this.entity.position);
        if (sqMagnitude(goalDiff) < 10) {
            this.atGoal = true;
            this.entity.dampen(dt);
        }
        else {
            this.entity.accelInDir(goalDiff, dt)
        }
        this.entity.applyVelocity(dt);

    }
}