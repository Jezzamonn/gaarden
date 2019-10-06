import { Drawable } from "./drawable";
import { DrawLine } from "./drawline";
import { ComboDrawable } from "./combodrawable";

export class DrawPoly extends ComboDrawable {

    /**
     * @param {Array<{x: number, y: number}>} points 
     */
    constructor(points, {closed = true, fill = true} = {}) {
        const lines = [];
        for (let i = 0; i < points.length - 1; i++) {
            const line = new DrawLine(points[i], points[i+1]);
            lines.push(line);
        }
        if (closed) {
            const line = new DrawLine(points[points.length-1], points[0]);
            lines.push(line);
        }
        super(lines);

        this.points = points;
        this.closed = closed;
        this.fill = fill;
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    safeDraw(context, startLength, endLength) {
        if (this.fill) {
            const drawnAmt = (endLength - startLength) / this.length;
            context.beginPath();
            context.fillStyle = 'white';
            context.globalAlpha = drawnAmt;
            for (let i = 0; i < this.points.length; i++) {
                if (i == 0) {
                    context.moveTo(this.points[i].x, this.points[i].y);
                }
                else {
                    context.lineTo(this.points[i].x, this.points[i].y);
                }
            }
            context.fill();
            context.globalAlpha = 1;
        }
        super.safeDraw(context, startLength, endLength);
    }

}