import { Entity } from "./entity";
import { sqDistBetween } from "../util";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
import { DrawCircle } from "../draw/drawcircle";
import { GoalBehaviour } from "../behaviour/goalbehaviour";
import { BabyTree } from "./babytree";
import { Hopper } from "../animator/hopper";

export class BabyPerson extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        const scale = 0.666;
        this.drawable = new ComboDrawable([
            new DrawLine({x: -3 * scale, y: 0}, {x: -3 * scale, y: -5 * scale}),
            new DrawLine({x: 3 * scale, y: 0}, {x: 3 * scale, y: -5 * scale}),
            new DrawCircle({x: 0, y: -7 * scale}, 5 * scale),
            new DrawCircle({x: 0, y: -15 * scale}, 5 * scale),
        ]);
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