import { Entity } from "./entity";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";

export class Animal extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        this.debugName = 'animal';
    }
}