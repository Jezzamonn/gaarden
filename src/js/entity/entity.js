export class Entity {

	constructor() {
        // Center ground position, methinks
        this.x = 0;
        this.y = 0;
	}

	/**
	 * Simulate time passing.
	 *
	 * @param {number} dt Time since the last frame, in seconds 
	 */
	update(dt) {
	}

	/**
	 * Render the current state of the controller.
	 *
	 * @param {!CanvasRenderingContext2D} context
	 */
	render(context) {
        context.save();
        context.translate(this.x, this.y);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.arc(0, 0, 10, 0, 2 * Math.PI);
        context.stroke();
        context.restore();
	}

}
