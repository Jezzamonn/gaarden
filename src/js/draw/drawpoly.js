import { Drawable } from "./drawable";
import { DrawLine } from "./drawline";
import { ComboDrawable } from "./combodrawable";

export class DrawPoly extends ComboDrawable {

    /**
     * @param {Array<{x: number, y: number}>} points 
     */
    constructor(points, {closed = true}) {
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
    }

}