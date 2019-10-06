import { Entity } from "./entity";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawCircle } from "../draw/drawcircle";
import { DrawEllipse } from "../draw/drawellipse";

export class Egg extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'egg';
        this.drawable = new ComboDrawable([
            new DrawCircle({x: 0, y: -10}, 10, 0, Math.PI),
            new DrawEllipse({x: 0, y: -10}, {x: 10, y: 20}, Math.PI, 2 * Math.PI),
        ]);
    }
}