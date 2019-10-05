export class Entity {

	constructor(controller) {
        // Center ground position, methinks
        this.controller = controller;
        this.position = {x: 0, y: 0}
	}

	/**
	 * Simulate time passing.
	 */
	update() {
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
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.beginPath();
        context.arc(0, 0, 10, 0, 2 * Math.PI);
        context.stroke();
    }

    checkClick(point) {
        if (this.touchingPoint(point)) {
            this.handleClick();
            return true;
        }
        return false;
    }

    handleClick() {}

    touchingPoint(point) {
        const xDiff = point.x - this.position.x;
        const yDiff = point.y - this.position.y;
        const sqDist = (xDiff * xDiff + yDiff * yDiff);
        return sqDist < 10 * 10;
    }

}
