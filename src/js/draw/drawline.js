import { Drawable } from "./drawable";
import { sqDistBetween, slurp, slurpPoint, clamp, multiplyPoint } from "../util";

export class DrawLine extends Drawable {

    /**
     * 
     * @param {{x: number, y: number}} start 
     * @param {{x: number, y: number}} end 
     */
    constructor(start, end) {
        super();
        this.start = start;
        this.end = end;
    }

    get length() {
        return Math.sqrt(sqDistBetween(this.start, this.end));
    }

    scale(scale) {
        this.start = multiplyPoint(scale, this.start);
        this.end = multiplyPoint(scale, this.end);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    safeDrawAmt(context, startAmt, endAmt) {
        const s = slurpPoint(this.start, this.end, startAmt);
        const e = slurpPoint(this.start, this.end, endAmt);

        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(s.x, s.y);
        context.lineTo(e.x, e.y);
        context.stroke();
    }

}