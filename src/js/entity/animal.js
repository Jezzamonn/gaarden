import { Entity } from "./entity";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawCircle } from "../draw/drawcircle";
import { DrawLine } from "../draw/drawline";

export class Animal extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        this.debugName = 'animal';
        this.drawable = new ComboDrawable([
            new DrawLine({x: -3, y: 0}, {x: -3, y: -5}),
            new DrawLine({x: 3, y: 0}, {x: 3, y: -5}),
            new DrawCircle({x: 0, y: -7}, 5),
        ]);
    }
}