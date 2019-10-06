import { Drawable } from "./drawable";
import { slurp, multiplyPoint } from "../util";

export class DrawCircle extends Drawable {

    constructor(centerPoint, radius, startAngle = 0, endAngle = 2 * Math.PI, { fill = true} = {}) {
        super();
        this.centerPoint = centerPoint;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.fill = fill;
    }

    get length() {
		return this.radius * Math.abs(this.endAngle - this.startAngle);
    }

    scale(scale) {
        this.centerPoint = multiplyPoint(scale, this.centerPoint);
        this.radius = scale * this.radius;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    safeDrawAmt(context, startAmt, endAmt) {
        const s = slurp(this.startAngle, this.endAngle, startAmt);
        const e = slurp(this.startAngle, this.endAngle, endAmt);
        
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.lineWidth = 1;
        context.beginPath();
        context.arc(this.centerPoint.x, this.centerPoint.y, this.radius, s, e);
        if  (this.fill) {
            context.fill();
        }
        context.stroke();
    }
}