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

    // /**
    //  * @param {CanvasRenderingContext2D} context 
    //  */
    // localRender(context) {
    //     context.strokeStyle = 'black';
    //     context.fillStyle = 'white';
    //     context.lineWidth = 1;
    //     context.beginPath();
    //     context.moveTo(0, 0);
    //     context.lineTo(-10, 0);
    //     context.lineTo(0, -40);
    //     context.lineTo(10, 0);
    //     context.closePath();
    //     context.fill();
    //     context.stroke();
    // }

}