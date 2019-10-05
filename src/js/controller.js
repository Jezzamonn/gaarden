import { Entity } from "./entity/entity";
import { Random, MersenneTwister19937 } from "random-js";

export default class Controller {

	constructor() {
		this.random = new Random(MersenneTwister19937.seed(123));
		this.entities = [];
		for (let i = 0; i < 10; i++) {
			const entity = new Entity(this);
			entity.x = this.random.real(-10, 10);
			entity.y = this.random.real(-10, 10);
			this.entities.push(entity);
		}
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
		for (const entity of this.entities) {
			entity.render(context);
		}
	}

}
