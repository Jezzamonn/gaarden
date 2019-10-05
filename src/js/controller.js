import { Entity } from "./entity/entity";
import { Random, MersenneTwister19937 } from "random-js";
import { Tree } from "./entity/tree";
import { BabyTree } from "./entity/babytree";
import { sqDistBetween } from "./util";
import { Person } from "./entity/person";
import { House } from "./entity/house";
import { Egg } from "./entity/egg";

export default class Controller {

	constructor() {
		this.random = new Random(MersenneTwister19937.seed(123));
		/** @type {!Array<!Entity>} */
		this.entities = [];
		this.newEntities = [];
		for (let i = 0; i < 1; i++) {
			const entity = new BabyTree(this);
			entity.position = {
				x: this.random.real(-100, 100),
				y: this.random.real(-100, 100),
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
		const tick = 1 / 60;
		for (const entity of this.entities) {
			entity.update(tick);
		}

		this.entities.push(...this.newEntities);
		this.newEntities = [];
		this.entities = this.entities.filter(e => !e.done);

		this.spawnNewEntities();
	}

	/**
	 * Render the current state of the controller.
	 *
	 * @param {!CanvasRenderingContext2D} context
	 */
	render(context) {
		context.translate(-this.cameraPosition.x, -this.cameraPosition.y);
		context.scale(this.cameraPosition.scale, this.cameraPosition.scale);

		this.sortEntities();
		for (const entity of this.entities) {
			entity.render(context);
		}
	}

	handleClick(point) {
		this.sortEntities();
		for (const entity of this.entities) {
			const handledClick = entity.checkClick(point);
			if (handledClick) {
				return;
			}
		}
	}

	sortEntities() {
		this.entities.sort((a, b) => a.position.y - b.position.y);
	}

	getClosestEntity(point, filter = null) {
		let bestSqDist = Infinity;
		let closest = null;
		let entities = this.entities;
		if (filter) {
			entities = entities.filter(filter);
		}
		for (const entity of entities) {
			const sqDist = sqDistBetween(point, entity.position);
			if (sqDist < bestSqDist) {
				bestSqDist = sqDist;
				closest = entity;
			}
		}
		return closest;
	}

	spawnNewEntities() {
		this.trySpawnBabyTrees();
		this.trySpawnEgg();
	}

	// Game stuff
	trySpawnBabyTrees() {
		let numBabyTrees = this.entities.filter(e => e instanceof BabyTree).length;
		const trees = this.entities.filter(e => e instanceof Tree);
		
		let wantedBabies = 0;
		if (trees.length == 0) {
			wantedBabies = 0;
		}
		else {
			wantedBabies = Math.floor(trees.length / 5) + 2;
		}

		for (let i = 0; i < 10; i++) {
			if (numBabyTrees >= wantedBabies) {
				return;
			}
			const randomTree = this.random.pick(trees);
			const point = randomTree.tryGetFreeNearbyPoint(30, 20);
			if (point == null) {
				continue;
			}
			const bb = new BabyTree(this);
			bb.position = point;
			this.entities.push(bb);
			numBabyTrees++;
		}
	}

	trySpawnEgg() {
		const eggs = this.entities.filter(e => e instanceof Egg);
		if (eggs.length >= 1) {
			return;
		}
		const houses = this.entities.filter(e => e instanceof House);
		
		if (houses.length >= 2) {
			for (let i = 0; i < 5; i++) {
				const randomEntity = this.random.pick(this.entities);
				const eggPoint = randomEntity.tryGetFreeNearbyPoint(100, 80);

				const egg = new Egg(this);
				egg.position = eggPoint;
				this.entities.push(egg);
				break;
			}
		}
	}
}
