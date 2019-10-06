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
    }

    setGoal(goal) {
        this.goal = goal;
        this.behaviour = new GoalBehaviour(this.controller, this);
        this.behaviour.goal = goal;
    }

    update(dt) {
        super.update(dt);
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
            const house = new House(this.controller);
            house.position = clonePoint(this.position);
            this.controller.newEntities.push(house);
        }

        if (!this.goal) {
            const nearestMouse = this.controller.getClosestEntity(this.position, e => e instanceof MouseEntity);
            if (nearestMouse && nearestMouse.mouseDown) {
                this.goal = nearestMouse;
                this.behaviour = new GoalBehaviour(this.controller, this);
                this.behaviour.goal = nearestMouse;
            }
        }
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
}