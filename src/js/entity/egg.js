import { Entity } from "./entity";

export class Egg extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'egg';
    }
}