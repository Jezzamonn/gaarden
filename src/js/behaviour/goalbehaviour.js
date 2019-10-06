import { Behaviour } from "./behaviour"
import { sqMagnitude, subPoints } from "../util";
import { Entity } from "../entity/entity";

export class GoalBehaviour extends Behaviour {

    constructor(controller, entity) {
        super(controller, entity);
        this.goal = null;
        this.atGoal = false;
    }

    update(dt) {
        let point = this.goal;
        if (this.goal instanceof Entity) {
            point = this.goal.position;
        }
        const goalDiff = subPoints(point, this.entity.position);
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