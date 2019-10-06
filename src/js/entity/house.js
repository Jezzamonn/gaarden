import { Entity } from "./entity";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
import { DrawPoly } from "../draw/drawpoly";

export class House extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'house';
        this.drawable = new ComboDrawable([
            new DrawLine({x: -10, y: 0}, {x: -10, y: -20}),
            new DrawLine({x: 10, y: 0}, {x: 10, y: -20}),
            new DrawPoly({x: 15, y: -20}, {x: 0, y: -30}, {x: 15, y: -20}),
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
        context.moveTo(-10, 0);
        context.lineTo(-10, -20);
        context.stroke();

        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(10, -20);
        context.stroke();

        context.beginPath();
        context.moveTo(-15, -20);
        context.lineTo(0, -30);
        context.lineTo(15, -20);
        context.stroke();
    }
}