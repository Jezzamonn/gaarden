import { Drawable } from "./drawable";
import { slurp } from "../util";

export class DrawEllipse extends Drawable {

    constructor(centerPoint, radii, startAngle = 0, endAngle = 2 * Math.PI) {
        super();
        this.centerPoint = centerPoint;
        this.radii = radii;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    get length() {
		return Math.min(this.radii.x, this.radii.y) * Math.abs(this.endAngle - this.startAngle);
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
        context.ellipse(this.centerPoint.x, this.centerPoint.y, this.radii.x, this.radii.y, 0, s, e);
        context.stroke();
    }
}