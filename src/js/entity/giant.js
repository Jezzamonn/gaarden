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

export class Giant extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        this.drawable = new ComboDrawable([
            new DrawLine({x: -6, y: 0}, {x: -6, y: -10}),
            new DrawLine({x: 6, y: 0}, {x: 6, y: -10}),
            new DrawCircle({x: 0, y: -14}, 10),
            new DrawCircle({x: 0, y: -30}, 10),
        ]);
        this.goal = null;
        this.drawSpeed *= 0.3;

        this.animCount = 0;
        this.animState = null;
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
        this.updateAnimations(dt);
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

    updateAnimations(dt) {
        const sqSpeed = sqMagnitude(this.velocity);
        if (sqSpeed > 10 * 10) {
            this.animCount += dt;
            this.animState = 'walking';
        }
        else {
            this.animCount = 0;
            this.animState = null;
        }
    }

    /**
     * @param {CanvasRenderingContext2D} controller
     */
    localRender(controller) {
        if (this.animState == 'walking') {
            const jumpSpeed = 0.15;
            let jumpAmt = (this.animCount / jumpSpeed) % 1;
            jumpAmt = 4 * jumpAmt * (1 - jumpAmt);
            controller.translate(0, -1.5 * jumpAmt);
        }
        super.localRender(controller);
    }
}