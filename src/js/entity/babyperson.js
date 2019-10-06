import { Entity } from "./entity";
import { sqDistBetween } from "../util";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
import { DrawCircle } from "../draw/drawcircle";
import { GoalBehaviour } from "../behaviour/goalbehaviour";
import { BabyTree } from "./babytree";
import { Hopper } from "../animator/hopper";
import { getPersonDrawable } from "./person";

export class BabyPerson extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        this.drawable = getPersonDrawable();
        this.drawable.scale(2 / 3);
        this.drawSpeed *= 0.6;

        this.hopper = new Hopper(controller, this);
    }

    update(dt) {
        super.update(dt);
        this.hopper.update(dt);
    }

    /**
     * @param {CanvasRenderingContext2D} context
     */
    localRender(context) {
        this.hopper.adjustContext(context);
        super.localRender(context);
    }
}