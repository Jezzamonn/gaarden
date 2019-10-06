import { Entity } from "./entity";
import { Tree } from "./tree";
import { TreeCluster } from "./treecluster";
import Controller from "../controller";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
import { House } from "./house";

export class BabyHouse extends Entity {

    /**
     * @param {Controller} controller
     */
    constructor(controller) {
        super(controller);
        this.debugName = 'babyhouse';
        const lines = [];
        const numLines = 3;
        for (let i = 0; i < numLines; i++) {
            const amt = (i / (numLines - 1)) + controller.random.real(-0.3, 0.3);
            const posNegAmt = 2 * amt - 1;
            const line = new DrawLine(
                {x: 5 * posNegAmt, y: 0},
                {x: -2 * posNegAmt, y: -5},
            );
            lines.push(line);
        }
        this.drawable = new ComboDrawable(lines);
    }

    handleClick() {
        const house = new House(this.controller);
        house.position = this.position;
        this.controller.newEntities.push(house);
        this.done = true;
        return true;
    }

}