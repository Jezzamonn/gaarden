import { Entity } from "./entity";
import { slurpPoint, clamp } from "../util";

export class MouseEntity extends Entity {

    constructor(controller) {
        super(controller);
        this.animCount = 0;
        this.desiredPosition = {x: 0, y: 0};
        this.alpha = 0.1;
    }

    update(dt) {
        this.animCount += dt;
        this.position = slurpPoint(this.position, this.desiredPosition, 0.3);

        if (this.mouseDown) {
            this.alpha += dt / 0.3;
        }
        else {
            this.alpha -= dt / 0.5;
        }
        this.alpha = clamp(this.alpha, 0, 1);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    localRender(context) {
        const size = 10;
        const numPaths = 3;
        context.strokeStyle = 'black';
        context.lineJoin = 'round';
        context.lineWidth = 1;
        context.beginPath();
        context.globalAlpha = this.alpha;
        for (let i = 0; i < numPaths; i++) {
            context.rotate(2 * Math.PI / numPaths);

            const numPoints = 10;
            for (let j = 0; j < numPoints; j++) {
                const jAmt = j / numPoints;
                const x = size * Math.cos(Math.PI * (2 * this.animCount + jAmt));
                const y = size * Math.cos(2 * (2 * this.animCount + jAmt));
                if (j == 0) {
                    context.moveTo(x, y);
                }
                else {
                    context.lineTo(x, y);
                }
            }
        }
        context.stroke();
        context.globalAlpha = 1;
    }

    handleMouseMove(point, mouseDown = false) {
        this.desiredPosition = point;
        this.mouseDown = mouseDown;
    }
}