import { Entity } from "./entity";
import { sqDistBetween } from "../util";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
import { DrawCircle } from "../draw/drawcircle";
import { GoalBehaviour } from "../behaviour/goalbehaviour";
import { BabyTree } from "./babytree";
import { Hopper } from "../animator/hopper";
import { getPersonDrawable, Person } from "./person";

export class BabyPerson extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        this.drawable = getPersonDrawable();
        this.drawable.scale(2 / 3);
        this.drawSpeed *= 0.6;

        this.hopper = new Hopper(controller, this);
        this.goal = null;
    }

    setGoal(goal) {
        this.goal = goal;
        this.behaviour = new GoalBehaviour(this.controller, this);
        this.behaviour.goal = goal;
        this.behaviour.desiredDist = 20;
    }

    update(dt) {
        super.update(dt);
        this.hopper.update(dt);

        if (this.goal == null && this.controller.random.bool(0.01)) {
            this.lookForAdult();
        }
    }

    lookForAdult() {
        const closestPerson = this.controller.getClosestEntity(this.position, e => e instanceof Person);
        if (closestPerson) {
            this.setGoal(closestPerson);
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context
     */
    localRender(context) {
        this.hopper.adjustContext(context);
        super.localRender(context);
    }
}