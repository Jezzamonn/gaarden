import { Entity } from "./entity/entity";
import { Random, MersenneTwister19937 } from "random-js";
import { Tree } from "./entity/tree";
import { BabyTree } from "./entity/babytree";
import { sqDistBetween, slurpPoint } from "./util";
import { Person } from "./entity/person";
import { House } from "./entity/house";
import { Egg } from "./entity/egg";
import { Camera } from "./camera";
import { TreeCluster } from "./entity/treecluster";
import { MouseEntity } from "./entity/mouse";
import { BabyHouse } from "./entity/babyhouse";
import { BabyMountain } from "./entity/babymountain";
import { Giant } from "./entity/giant";
import { BabyPerson } from "./entity/babyperson";
import { MusicThing } from "./musicthing";

export default class Controller {

	constructor() {
		this.random = new Random(MersenneTwister19937.seed(123));
		/** @type {!Array<!Entity>} */
		this.entities = [];
		this.newEntities = [];
		this.camera = new Camera(this);

		this.spawnInitialTree();
		this.entities.push(new MouseEntity(this));

		this.musicThing = new MusicThing(this);
	}

	spawnInitialTree() {
		const cluster = new TreeCluster(this);
		const entity = new BabyTree(this, cluster);
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
		this.makeThePeopleWantToHaveBabies();

		this.camera.update(dt);

		// HACK for quickly debugging
		if (this.random.bool(0.1)) {
			// this.clickRandomEntity();
		}

		this.musicThing.update(dt);
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
		// Now we fall back to a more lenient click, to help with things like mobile
		// TODO: Only do this on mobile?
		for (const entity of this.entities) {
			const dist = sqDistBetween(point, entity.position);
			if (dist < 30 * 30) {
				const handledClick = entity.handleClick();
				if (handledClick) {
					return;
				}
			}
		}
	}

	handleMouseMove(point, mouseDown) {
		const adjustedPoint = this.camera.pointToGameCoords(point);
		this.handleGameCoordMouseMove(adjustedPoint, mouseDown);
	}

	handleGameCoordMouseMove(point, mouseDown) {
		for (const entity of this.entities) {
			entity.handleMouseMove(point, mouseDown);
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
		const houses = this.entities.filter(e => e instanceof House && e.active);
		
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

				// Now all the people want to see the egg!
				const people = this.entities.filter(e => e instanceof Person);
				for (const person of people) {
					person.setGoal(egg);
				}
				break;
			}
		}
	}

	makeThePeopleWantToHaveBabies() {
		if (this.random.bool(0.99)) {
			return;
		}
		const unchildedPeople = this.entities.filter(e => e instanceof Person && !e.childed && e.goal == null)
		if (unchildedPeople.length >= 2) {
			const r1 = this.random.integer(0, unchildedPeople.length - 1);
			let r2 = this.random.integer(0, unchildedPeople.length - 2);
			if (r2 >= r1) {
				r2++;
			}

			const p1 = unchildedPeople[r1];
			const p2 = unchildedPeople[r2];
			const midPoint = slurpPoint(p1.position, p2.position, 0.5);
			
			const house = this.getClosestEntity(midPoint, e => e instanceof House);
			if (house == null) {
				return;
			}

			p1.setGoal(house);
			p2.setGoal(house);
		}
	}
}
