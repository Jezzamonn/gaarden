import { Entity } from "./entity";

export class Tree extends Entity {

    handleClick() {
        const babie = new Tree(this.controller);
        babie.position.x = this.position.x + this.controller.random.real(-10, 10);
        babie.position.y = this.position.y + this.controller.random.real(-10, 10);
        this.controller.entities.push(babie);
    }

}