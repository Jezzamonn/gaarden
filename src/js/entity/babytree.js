import { Entity } from "./entity";
import { Tree } from "./tree";
import { TreeCluster } from "./treecluster";
import Controller from "../controller";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";

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
        this.drawable = new ComboDrawable([
            new DrawLine({x: -5, y: -3}, {x: 5, y: 3}),
            new DrawLine({x: -5, y: 3}, {x: 5, y: -3}),
        ]);
    }

    handleClick() {
        const tree = new Tree(this.controller, this.cluster);
        tree.position = this.position;
        this.controller.newEntities.push(tree);
        this.done = true;
        return true;
    }

}