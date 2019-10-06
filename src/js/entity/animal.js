import { Entity } from "./entity";
import { WanderBehaviour } from "../behaviour/wanderbehaviour";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawCircle } from "../draw/drawcircle";
import { DrawLine } from "../draw/drawline";
import { GoalBehaviour } from "../behaviour/goalbehaviour";
import { Hopper } from "../animator/hopper";

export class Animal extends Entity {

    constructor(controller) {
        super(controller);
        this.behaviour = new WanderBehaviour(controller, this);
        this.debugName = 'animal';
        this.drawable = new ComboDrawable([
            new DrawLine({x: -3, y: 0}, {x: -3, y: -5}),
            new DrawLine({x: 3, y: 0}, {x: 3, y: -5}),
            new DrawCircle({x: 0, y: -7}, 5),
        ]);
        this.goal = null;
        this.follower = null;
        this.hopper = new Hopper(this.controller, this);
    }

    setGoal(goal) {
        this.goal = goal;
        this.behaviour = new GoalBehaviour(this.controller, this);
        this.behaviour.goal = goal;
        this.behaviour.desiredDist = 20;
    }

    update(dt) {
        super.update(dt);

        if (this.goal == null && this.controller.random.bool(0.01)) {
            this.lookForFriend();
        }

        this.hopper.update(dt);
    }

    localRender(context) {
        this.hopper.adjustContext(context);
        super.localRender(context);
    }

    lookForFriend() {
        const animals = this.controller.entities.filter(e => (
            e instanceof Animal &&
            e !== this &&
            e.follower == null));
        for (const animal of animals) {
            let leader = animal;
            while (leader.goal) {
                leader = leader.goal;
            }
            if (leader === this) {
                continue;
            }

            this.setGoal(animal);
            animal.follower = this;
        }
    }

}