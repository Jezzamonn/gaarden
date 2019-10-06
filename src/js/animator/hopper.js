import { sqMagnitude } from "../util";

export class Hopper {

    constructor(controller, entity) {
        this.controller = controller;
        this.entity = entity;
        this.animCount = 0;
        this.animState = null;
    }

    update(dt) {
        const sqSpeed = sqMagnitude(this.entity.velocity);
        if (sqSpeed > 10 * 10) {
            this.animCount += dt;
            this.animState = 'walking';
        }
        else {
            this.animCount = 0;
            this.animState = null;
        }
    }

    adjustContext(context) {
        if (this.animState == 'walking') {
            const jumpSpeed = 0.15;
            let jumpAmt = (this.animCount / jumpSpeed) % 1;
            jumpAmt = 4 * jumpAmt * (1 - jumpAmt);
            context.translate(0, -1.5 * jumpAmt);
        }
    }

}