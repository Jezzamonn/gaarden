import { Entity } from "./entity";

export class Tree extends Entity {

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    localRender(context) {
        context.strokeStyle = 'black';
        context.fillStyle = 'white';
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(-5, 0);
        context.lineTo(0, -20);
        context.lineTo(5, 0);
        context.closePath();
        context.fill();
        context.stroke();
    }

    handleClick() {
        const babie = new Tree(this.controller);
        babie.position.x = this.position.x + this.controller.random.real(-10, 10);
        babie.position.y = this.position.y + this.controller.random.real(-10, 10);
        this.controller.entities.push(babie);
    }

}