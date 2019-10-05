import { Drawable } from "./drawable";
import { DrawLine } from "./drawline";
import { ComboDrawable } from "./combodrawable";

export class DrawPoly extends ComboDrawable {

    /**
     * @param {Array<{x: number, y: number}>} points 
     */
    constructor(points, {closed = true}) {
        this.points = points;
        this.closed = closed;

        this.lines = [];
        for (let i = 0; i < points.length - 1; i++) {
            const line = new DrawLine(points[i], points[i+1]);
            this.lines.push(line);
        }
        if (closed) {
            const line = new DrawLine(points[points.length-1], points[0]);
            this.lines.push(line);
        }
        super(this.lines);
    }

}