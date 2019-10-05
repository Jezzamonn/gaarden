export class Entity {

	constructor(controller) {
        // Center ground position, methinks
        this.controller = controller;
        this.x = 0;
        this.y = 0;
	}

	/**
	 * Simulate time passing.
	 */
	update() {
        this.x += this.controller.random.real(-1, 1);
        this.y += this.controller.random.real(-1, 1);
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
        context.beginPath();
        context.arc(0, 0, 10, 0, 2 * Math.PI);
        context.stroke();
        
        context.restore();
	}

}
