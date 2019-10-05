import { Entity } from "./entity";
import { Tree } from "./tree";
import { TreeCluster } from "./treecluster";
import Controller from "../controller";

export class BabyTree extends Entity {

    /**
     * @param {Controller} controller
     * @param {TreeCluster} cluster
     */
    constructor(controller, cluster) {
        super(controller);
        this.debugName = 'babytree';
        if (cluster == null) {
            throw new Error('null cluster >:(');
        }
        this.cluster = cluster;
    }

    handleClick() {
        const tree = new Tree(this.controller, this.cluster);
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