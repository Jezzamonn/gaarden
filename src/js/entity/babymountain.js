import { Entity } from "./entity";
import Controller from "../controller";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
import { Mountain } from "./mountain";
import { addPoints } from "../util";

export class BabyMountain extends Entity {

    /**
     * @param {Controller} controller
     */
    constructor(controller) {
        super(controller);
        this.debugName = 'babyhouse';
        const lines = [];
        const numLines = 3;
        for (let i = 0; i < numLines; i++) {
            const amt = i / numLines;
            const angle = 2 * Math.PI * amt;
            const dir = {
                x: Math.cos(angle),
                y: Math.sin(angle),
            }
            const lineSegments = 10;
            let p = {x: 0, y: 0};
            for (let l = 0; l < lineSegments; l++) {
                const p2 = {
                    x: p.x + this.controller.random.real(-5, 5) + 5 * dir.x,
                    y: p.y + this.controller.random.real(-5, 5) + 3 * dir.y,
                }
                const line = new DrawLine(p, p2);
                lines.push(line);
                p = p2;
            }
        }
        this.drawable = new ComboDrawable(lines);
    }

    touchingPoint(point) {
        const xDiff = point.x - this.position.x;
        const yDiff = point.y - this.position.y;
        const sqDist = (xDiff * xDiff + yDiff * yDiff);
        return sqDist < 20 * 20;
    }

    handleClick() {
        const poses = [
            {x: -40, y: -10},
            {x: 0, y: 10},
            {x: 40, y: -10},
        ];
        for (const pos of poses) {
            const house = new Mountain(this.controller);
            house.position = addPoints(this.position, pos);
            this.controller.newEntities.push(house);
            this.done = true;
        }
        return true;
    }

}