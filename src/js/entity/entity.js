import { sqDistBetween, multiplyPoint, addPoints, normalisePoint, clampMagnitude } from "../util";
import Controller from "../controller";
import { Behaviour } from "../behaviour/behaviour";
import { Drawable } from "../draw/drawable";

export class Entity {

    /**
     * @param {Controller} controller 
     */
	constructor(controller) {
        // Center ground position, methinks
        this.controller = controller;
        // Properties
        this.debugName = 'entity';
        this.maxSpeed = 20;
        this.accel = 20;
        this.damp = 0.9;
        this.drawSpeed = 100;

        // State
        this.position = {x: 0, y: 0};
        this.velocity = {x: 0, y: 0};
        this.drawnAmt = 0;
        this.active = false;
        this.done = false;
        this.updated = false;
        /** @type {Behaviour} */
        this.behaviour = null;
        /** @type {Drawable} */
        this.drawable = null;
   }
    
	/**
	 * Simulate time passing.
	 */
	update(dt) {
        this.drawnAmt += this.drawSpeed * dt;
        if (this.drawable && this.drawnAmt > this.drawable.length) {
            this.active = true;
        }
        else {
            this.active = true;
        }

        if (!this.updated) {
            this.firstUpdate();
            this.updated = true;
        }

        if (this.behaviour) {
            this.behaviour.update(dt);
        }
    }

    firstUpdate() {}


    accelInDir(direction, dt) {
        const accelVec = multiplyPoint(this.accel, normalisePoint(direction));
        this.velocity = clampMagnitude(addPoints(accelVec, this.velocity), this.maxSpeed)
    }

    applyVelocity(dt) {
        this.position = addPoints(this.position, multiplyPoint(dt, this.velocity));
    }

    dampen(dt) {
        this.velocity = multiplyPoint(this.damp, this.velocity);
    }

	/**
	 * Render the current state of the controller.
	 *
	 * @param {!CanvasRenderingContext2D} context
	 */
	render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);

        this.localRender(context);

        context.restore();
    }

    localRender(context) {
        if (!this.drawable) {
            this.debugRender(context);
        }
        this.drawable.draw(context, 0, this.drawnAmt);
    }

    debugRender(context) {
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.beginPath();
        context.arc(0, 0, 10, 0, 2 * Math.PI);
        context.stroke();
        context.fillText(this.debugName, 0, 0)
    }

    checkClick(point) {
        if (!this.active) {
            return false;
        }
        if (this.touchingPoint(point)) {
            return this.handleClick();
        }
        return false;
    }

    handleClick() {
        return false;
    }

    touchingPoint(point) {
        const xDiff = point.x - this.position.x;
        const yDiff = point.y - this.position.y;
        const sqDist = (xDiff * xDiff + yDiff * yDiff);
        return sqDist < 10 * 10;
    }

    getNearbyPoint(dist) {
        const angle = this.controller.random.real(0, 2 * Math.PI);
        return {
            x: this.position.x + dist * Math.cos(angle),
            y: this.position.y + dist * Math.sin(angle),
        }
    }

    tryGetFreeNearbyPoint(dist, minOtherDist) {
        for (let i = 0; i < 10; i++) {
            const point = this.getNearbyPoint(dist);
            const closestEntity = this.controller.getClosestEntity(point);
            const closestSqDist = sqDistBetween(point, closestEntity.position);
            if (closestSqDist > minOtherDist * minOtherDist) {
                return point;
            }
        }
        return null;
    }

}
