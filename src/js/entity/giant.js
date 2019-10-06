import { Entity } from "./entity";
import { subPoints, normalisePoint, addPoints, clampMagnitude, multiplyPoint, sqMagnitude, sqDistBetween, clonePoint } from "../util";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";
import { House } from "./house";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
import { DrawCircle } from "../draw/drawcircle";
import { Tree } from "./tree";
import { GoalBehaviour } from "../behaviour/goalbehaviour";
import { MouseEntity } from "./mouse";
import { Animal } from "./animal";
import { BabyHouse } from "./babyhouse";
import { BabyTree } from "./babytree";
import { Hopper } from "../animator/hopper";
import { getPersonDrawable } from "./person";

export class Giant extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        this.drawable = getPersonDrawable();
        this.drawable.scale(2);
        this.goal = null;
        this.drawSpeed *= 0.3;

        this.hopper = new Hopper(controller, this);
    }

    setGoal(goal) {
        this.goal = goal;
        this.behaviour = new GoalBehaviour(this.controller, this);
        this.behaviour.goal = goal;
    }

    update(dt) {
        super.update(dt);

        this.lookForBabyTree();
        this.updateGoal();
        this.hopper.update(dt);
    }

    lookForBabyTree() {
        if (this.goal) {
            return;
        }
        if (this.controller.random.bool(0.99)) {
            return;
        }
        // Filter out some options so we don't always get the closest
        const bb = this.controller.getClosestEntity(this.position, e => e instanceof BabyTree && this.controller.random.bool(0.4));
        if (bb) {
            this.setGoal(bb);
        }
    }

    updateGoal() {
        if (this.goal) {
            const sqGoalDist = sqDistBetween(this.goal.position, this.position);
            if (sqGoalDist < 10 * 10) {
                // Spawn the trees matey!
                this.goal.handleClick();
                this.goBackToWandering();
            }
        }
    }

    goBackToWandering() {
        this.goal = null;
        this.behaviour = new WanderBehaviour(this.controller, this)
    }

    /**
     * @param {CanvasRenderingContext2D} context
     */
    localRender(context) {
        this.hopper.adjustContext(context);
        super.localRender(context);
    }
}