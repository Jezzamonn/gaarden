import { Drawable } from "./drawable";
import { slurp } from "../util";

export class DrawCircle extends Drawable {

    constructor(centerPoint, radius, startAngle, endAngle) {
        super();
        this.centerPoint = centerPoint;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    get length() {
		return this.radius * Math.abs(this.endAngle - this.startAngle);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    safeDrawAmt(context, startAmt, endAmt) {
        const s = slurp(this.startAngle, this.endAngle, startAmt);
        const e = slurp(this.startAngle, this.endAngle, endAmt);
        
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.beginPath();
        context.arc(this.centerPoint.x, this.centerPoint.y, this.radius, s, e);
        context.stroke();
    }
}