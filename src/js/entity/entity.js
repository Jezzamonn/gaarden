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
        this.position.x += this.controller.random.real(-1, 1);
        this.position.y += this.controller.random.real(-1, 1);
	}

	/**
	 * Render the current state of the controller.
	 *
	 * @param {!CanvasRenderingContext2D} context
	 */
	render(context) {
        context.save();
        context.translate(this.position.x, this.position.y);

        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.beginPath();
        context.arc(0, 0, 10, 0, 2 * Math.PI);
        context.stroke();

        context.restore();
    }

    checkClick(point) {
        if (this.touchingPoint(point)) {
            const babie = new Entity(this.controller);
            babie.position.x = this.x + this.controller.random.real(-10, 10);
            babie.position.y = this.y + this.controller.random.real(-10, 10);
            this.controller.entities.push(babie);
        }
    }

    touchingPoint(point) {
        const xDiff = point.x - this.position.x;
        const yDiff = point.y - this.position.y;
        const sqDist = (xDiff * xDiff + yDiff * yDiff);
        return sqDist < 10 * 10;
    }

}
