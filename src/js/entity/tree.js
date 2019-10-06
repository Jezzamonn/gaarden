import { Entity } from "./entity";
import { Person } from "./person";
import { clonePoint } from "../util";
import { Animal } from "./animal";
import { TreeCluster } from "./treecluster";
import { DrawPoly } from "../draw/drawpoly";

export class Tree extends Entity {

    constructor(controller, cluster) {
        super(controller);
        this.cluster = cluster;

        this.drawable = new DrawPoly([
            {x: -10, y: 0},
            {x: 0, y: -40},
            {x: 10, y: 0},
        ], {closed: true});
    }

    firstUpdate() {
        this.cluster.spawnNextEntity(this);
    }

}