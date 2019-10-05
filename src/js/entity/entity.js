import { sqDistBetween } from "../util";

export class Entity {

	constructor(controller) {
        // Center ground position, methinks
        this.controller = controller;
        this.position = {x: 0, y: 0};
        this.active = true;
        this.done = false;
        this.debugName = 'entity';
        this.updated = false;
    }
    
	/**
	 * Simulate time passing.
	 */
	update(dt) {
        if (!this.updated) {
            this.firstUpdate();
            this.updated = true;
        }
    }

    firstUpdate() {}

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
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.beginPath();
        context.arc(0, 0, 10, 0, 2 * Math.PI);
        context.stroke();
        context.fillText(this.debugName, 0, 0)
    }

    checkClick(point) {
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
