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

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    localRender(context) {
        context.strokeStyle = 'black';
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(-5, -5);
        context.lineTo(5, 5);
        
        context.moveTo(-5, 5);
        context.lineTo(5, -5);
        context.stroke();
    }

}