import { Entity } from "./entity";
import { subPoints, normalisePoint, addPoints, clampMagnitude, multiplyPoint, sqMagnitude, sqDistBetween, clonePoint } from "../util";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";
import { House } from "./house";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
import { DrawCircle } from "../draw/drawcircle";
import { Tree } from "./tree";

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
    }

    update(dt) {
        super.update(dt);
        if (this.controller.random.bool(0.1)) {
            const nearest = this.controller.getClosestEntity(this.position, e => e !== this);
            const sqDist = sqDistBetween(this.position, nearest.position);
            if (sqDist < 50 * 50) {
                return;
            }
            const nearestTree = this.controller.getClosestEntity(this.position, e => e instanceof Tree);
            if (nearestTree == null) {
                return;
            }
            const treeSqDist = sqDistBetween(this.position, nearestTree.position);
            if (treeSqDist > 70 * 70) {
                return;
            }
            const house = new House(this.controller);
            house.position = clonePoint(this.position);
            this.controller.newEntities.push(house);
        }
    }

}