import { Entity } from "./entity";
import { Tree } from "./tree";

export class BabyTree extends Entity {

    constructor(controller) {
        super(controller);
        this.debugName = 'babytree'
    }

    handleClick() {
        const tree = new Tree(this.controller);
        tree.position = this.position;
        this.controller.newEntities.push(tree);
        this.done = true;
        return true;
    }

}