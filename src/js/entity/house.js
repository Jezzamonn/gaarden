import { Entity } from "./entity";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
import { DrawPoly } from "../draw/drawpoly";

export class House extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'house';
        this.drawable = new ComboDrawable([
            new DrawLine({x: -10, y: 0}, {x: -10, y: -20}),
            new DrawLine({x: 10, y: 0}, {x: 10, y: -20}),
            new DrawPoly([{x: -15, y: -20}, {x: 0, y: -30}, {x: 15, y: -20}], {closed: false}),
        ]);
    }
}