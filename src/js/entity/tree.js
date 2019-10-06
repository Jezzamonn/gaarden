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

        this.windCount = 0;
        this.windSpeed = controller.random.real(5, 5.1);
    }

    update(dt) {
        super.update(dt);

        this.windCount += dt;
    }

    firstUpdate() {
        this.cluster.spawnNextEntity(this);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    localRender(context) {
        const wind = 0.02 * Math.sin(2 * Math.PI * this.windCount / this.windSpeed);
        context.transform(1, 0, wind, 1, 0, 0);
        super.localRender(context);
    }

}