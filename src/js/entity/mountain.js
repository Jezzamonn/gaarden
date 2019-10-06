import { Entity } from "./entity";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
import { DrawPoly } from "../draw/drawpoly";

export class Mountain extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'mountain';
        this.drawable = new DrawPoly([{x: -50, y: 0}, {x: 0, y: -100}, {x: 50, y: 0}], {closed: false});
    }
}