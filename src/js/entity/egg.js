import { Entity } from "./entity";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawCircle } from "../draw/drawcircle";
import { DrawEllipse } from "../draw/drawellipse";

export class Egg extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'egg';
        this.drawable = new ComboDrawable([
            new DrawCircle({x: 0, y: -10}, 10, 0, Math.PI),
            new DrawEllipse({x: 0, y: -10}, {x: 10, y: 20}, Math.PI, 2 * Math.PI),
        ]);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    localRender(context) {
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.lineWidth = 1;

        context.beginPath();
        context.arc(0, -10, 10, 0, Math.PI);
        context.ellipse(0, -10, 10, 20, 0, Math.PI, 2 * Math.PI)
        context.fill();
        context.stroke();
    }
}