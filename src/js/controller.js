import { Entity } from "./entity/entity";
import { Random, MersenneTwister19937 } from "random-js";
import { Tree } from "./entity/tree";
import { BabyTree } from "./entity/babytree";
import { sqDistBetween } from "./util";
import { Person } from "./entity/person";
import { House } from "./entity/house";
import { Egg } from "./entity/egg";
import { Camera } from "./camera";
import { TreeCluster } from "./entity/treecluster";

export default class Controller {

	constructor() {
		this.random = new Random(MersenneTwister19937.seed(123));
		/** @type {!Array<!Entity>} */
		this.entities = [];
		this.newEntities = [];
		this.camera = new Camera(this);

		this.spawnInitialTree();
	}

	spawnInitialTree() {
		const cluster = new TreeCluster(this);
		const entity = new BabyTree(this, cluster);
		entity.position = {
			x: this.random.real(-100, 100),
			y: this.random.real(-100, 100),
		};
		this.entities.push(entity, cluster);
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

		this.camera.update(dt);

		// HACK for quickly debugging
		if (this.random.bool(0.1)) {
			this.clickRandomEntity();
		}
	}

	clickRandomEntity() {
		const entity = this.random.pick(this.entities);
		this.handleGameCoordClick(entity.position);
	}

	/**
	 * Render the current state of the controller.
	 *
	 * @param {!CanvasRenderingContext2D} context
	 */
	render(context) {
		this.camera.transformContext(context);

		this.sortEntities();
		for (const entity of this.entities) {
			entity.render(context);
		}
	}

	handleClick(point) {
		const adjustedPoint = this.camera.pointToGameCoords(point);
		this.handleGameCoordClick(adjustedPoint);
	}

	handleGameCoordClick(point) {
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
		this.trySpawnEgg();
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
				if (eggPoint == null) {
					continue;
				}

				const egg = new Egg(this);
				egg.position = eggPoint;
				this.entities.push(egg);
				break;
			}
		}
	}
}
