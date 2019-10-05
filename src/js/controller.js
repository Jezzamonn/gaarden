import { Entity } from "./entity/entity";
import { Random, MersenneTwister19937 } from "random-js";

export default class Controller {

	constructor() {
		this.random = new Random(MersenneTwister19937.seed(123));
		this.entities = [];
		for (let i = 0; i < 10; i++) {
			const entity = new Entity(this);
			entity.position = {
				x: this.random.real(-10, 10),
				y: this.random.real(-10, 10),
			};
			this.entities.push(entity);
		}

		// this.cameraPosition = {x: 200, y: 200, scale: 0.5};
		this.cameraPosition = {x: 0, y: 0, scale: 1};
	}

	/**
	 * Simulate time passing.
	 *
	 * @param {number} dt Time since the last frame, in seconds 
	 */
	update(dt) {
		for (const entity of this.entities) {
			entity.update();
		}
	}

	/**
	 * Render the current state of the controller.
	 *
	 * @param {!CanvasRenderingContext2D} context
	 */
	render(context) {
		context.translate(-this.cameraPosition.x, -this.cameraPosition.y);
		context.scale(this.cameraPosition.scale, this.cameraPosition.scale);

		for (const entity of this.entities) {
			entity.render(context);
		}
	}

	handleClick(point) {
		this.entities[0].position.x = point.x;
		this.entities[0].position.y = point.y;
	}
}
