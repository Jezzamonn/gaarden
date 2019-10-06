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

export class Person extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        this.drawable = new ComboDrawable([
            new DrawLine({x: -3, y: 0}, {x: -3, y: -5}),
            new DrawLine({x: 3, y: 0}, {x: 3, y: -5}),
            new DrawCircle({x: 0, y: -7}, 5),
            new DrawCircle({x: 0, y: -15}, 5),
        ]);
        this.goal = null;

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

        this.trySpawnHouse();
        this.tryFollowMouse();
        this.updateGoal();

        this.updateAnimations(dt);
    }

    trySpawnHouse() {
        if (this.controller.random.bool(0.1)) {
            const nearest = this.controller.getClosestEntity(this.position, e => !(e instanceof Person || e instanceof Animal));
            const sqDist = sqDistBetween(this.position, nearest.position);
            if (sqDist < 50 * 50) {
                return;
            }
            const nearestTree = this.controller.getClosestEntity(this.position, e => e instanceof Tree);
            if (nearestTree == null) {
                return;
            }
            const treeSqDist = sqDistBetween(this.position, nearestTree.position);
            if (treeSqDist > 100 * 100) {
                return;
            }
            const house = new BabyHouse(this.controller);
            house.position = clonePoint(this.position);
            this.controller.newEntities.push(house);
        }
    }

    tryFollowMouse() {
        if (!this.goal) {
            const nearestMouse = this.controller.getClosestEntity(this.position, e => e instanceof MouseEntity);
            if (nearestMouse && nearestMouse.mouseDown) {
                this.goal = nearestMouse;
                this.behaviour = new GoalBehaviour(this.controller, this);
                this.behaviour.goal = nearestMouse;
            }
        }
    }

    updateGoal() {
        if (this.goal instanceof MouseEntity && !this.goal.mouseDown) {
            this.goBackToWandering();
        }

        if (this.goal) {
            const sqGoalDist = sqDistBetween(this.goal.position, this.position);
            if (sqGoalDist < 10 * 10) {
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