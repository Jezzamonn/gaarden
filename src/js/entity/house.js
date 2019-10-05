import { Entity } from "./entity";

export class House extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'house';
    }
}