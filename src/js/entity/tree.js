import { Entity } from "./entity";
import { Person } from "./person";
import { clonePoint } from "../util";

export class Tree extends Entity {

    firstUpdate() {
        const numTrees = this.controller.entities.filter(e => e instanceof Tree).length;
        if (numTrees % 4 == 0) {
            const person = new Person(this.controller);
            person.position = {
                x: this.position.x,
                y: this.position.y - 0.1,
            }
            this.controller.newEntities.push(person);
        }
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    localRender(context) {
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(-10, 0);
        context.lineTo(0, -40);
        context.lineTo(10, 0);
        context.closePath();
        context.fill();
        context.stroke();
    }

}