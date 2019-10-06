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
import { Hopper } from "../animator/hopper";

export const getPersonDrawable = () => new ComboDrawable([
    new DrawLine({x: -3, y: 0}, {x: -3, y: -5}),
    new DrawLine({x: 3, y: 0}, {x: 3, y: -5}),
    new DrawCircle({x: 0, y: -7}, 5),
    new DrawCircle({x: 0, y: -15}, 5),
]);

export class Person extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        this.drawable = getPersonDrawable();
        this.goal = null;
        this.drawSpeed *= 0.3;

        this.hopper = new Hopper(controller, this);
        this.childed = false;
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

        this.hopper.update(dt);
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
            if (!(this.behaviour instanceof GoalBehaviour)) {
                // what?
                this.goBackToWandering();
            }

            const sqGoalDist = sqDistBetween(this.goal.position, this.position);
            if (sqGoalDist < 1.1 * 1.1 * this.behaviour.desiredDist * this.behaviour.desiredDist) {
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