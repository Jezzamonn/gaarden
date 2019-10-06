import { Drawable } from "./drawable";
import { slurp, multiplyPoint } from "../util";

export class DrawEllipse extends Drawable {

    constructor(centerPoint, radii, startAngle = 0, endAngle = 2 * Math.PI, { fill = true} = {}) {
        super();
        this.centerPoint = centerPoint;
        this.radii = radii;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.fill = fill;
    }

    get length() {
		return Math.min(this.radii.x, this.radii.y) * Math.abs(this.endAngle - this.startAngle);
    }

    scale(scale) {
        this.centerPoint = multiplyPoint(scale, this.centerPoint);
        this.radii = multiplyPoint(scale, this.radii);
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
        context.ellipse(this.centerPoint.x, this.centerPoint.y, this.radii.x, this.radii.y, 0, s, e);
        if (this.fill) {
            context.fill();
        }
        context.stroke();
    }
}