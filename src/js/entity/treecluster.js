import Controller from "../controller";
import { Tree } from "./tree";
import { Entity } from "./entity";
import { BabyTree } from "./babytree";
import { Person } from "./person";
import { Animal } from "./animal";

export class TreeCluster extends Entity {

    localRender() {
        // NOTHING
    }

    update(dt) {
        super.update(dt);
        this.trySpawnBabyTrees();
    }

    spawnNextEntity(spawningEntity) {
        const treesInCluster = this.controller.entities.filter(e => e instanceof Tree && e.cluster === this);
        const justInFront = {
            x: spawningEntity.position.x,
            y: spawningEntity.position.y + 0.1,
        };
        if (treesInCluster.length == 4) {
            const person = new Person(this.controller);
            person.position = justInFront;
            this.controller.newEntities.push(person);
            return;
        }
        if (treesInCluster.length == 8 || treesInCluster.length == 16) {
            const newCluster = new TreeCluster(this.controller);
            const newBaby = new BabyTree(this.controller, newCluster);
            let point = null;
            for (let i = 0; i < 10; i++) {
                const randomTree = this.controller.random.pick(treesInCluster);
                point = randomTree.tryGetFreeNearbyPoint(200, 180);
                if (point == null) {
                    continue;
                }
                break;
            }
            // As a fall back, try ANY tree
            if (point == null) {
                const allTrees = this.controller.entities.filter(e => e instanceof Tree);
                for (let i = 0; i < 10; i++) {
                    const randomTree = this.controller.random.pick(allTrees);
                    point = randomTree.tryGetFreeNearbyPoint(300, 260);
                    if (point == null) {
                        continue;
                    }
                    break;
                }
            }
            if (point == null) {
                return;
            }
            newBaby.position = point;
            this.controller.newEntities.push(newCluster, newBaby);
            return;
        }
        if (treesInCluster.length % 4 == 0) {
            const animal = new Animal(this.controller);
            animal.position = justInFront;
            this.controller.newEntities.push(animal);
            return;
        }
    }

	trySpawnBabyTrees() {
		let numBabyTrees = this.controller.entities.filter(e => e instanceof BabyTree && e.cluster === this).length;
		const trees = this.controller.entities.filter(e => e instanceof Tree && e.cluster === this);
		
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
			const randomTree = this.controller.random.pick(trees);
			const point = randomTree.tryGetFreeNearbyPoint(30, 20);
			if (point == null) {
				continue;
			}
			const bb = new BabyTree(this.controller, this);
			bb.position = point;
			this.controller.newEntities.push(bb);
			numBabyTrees++;
		}
	}



}