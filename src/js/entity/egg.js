import { Entity } from "./entity";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawCircle } from "../draw/drawcircle";
import { DrawEllipse } from "../draw/drawellipse";
import { Person } from "./person";
import { slurp, clamp } from "../util";

const getBaseEggDrawable = () => new ComboDrawable([
    new DrawCircle({x: 0, y: -10}, 10, 0, Math.PI),
    new DrawEllipse({x: 0, y: -10}, {x: 10, y: 20}, Math.PI, 2 * Math.PI),
]);

export class Egg extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'egg';
        this.drawable = getBaseEggDrawable();
        this.lastScale = 1;
        this.desiredScale = 1;
    }

    update(dt) {
        super.update(dt);


        const numPeople = this.controller.entities.filter(e => e instanceof Person).length;
        const extraPeople = clamp(numPeople - 1, 0, Infinity);
        this.desiredScale = 1 + 0.5 * extraPeople;

        const scale = slurp(this.lastScale, this.desiredScale, 0.05);
        
        if (scale != this.lastScale) {
            this.drawable = getBaseEggDrawable();
            this.drawable.scale(scale);
            this.lastScale = scale;
        }
    }
}