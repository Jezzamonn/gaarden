import { Entity } from "./entity";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawCircle } from "../draw/drawcircle";
import { DrawEllipse } from "../draw/drawellipse";
import { Person } from "./person";
import { slurp, clamp } from "../util";
import Tone from 'tone';
import { BabyMountain } from "./babymountain";

const synth = new Tone.PolySynth(4, Tone.Synth, {
    oscillator : {
        type : 'sine'
    },
    envelope : {
        attackCurve : 'linear',
        attack : 0.01,
        decay : 0.1,
        decayCurve: 'exponential',
        sustain : 0.1,
        release : 1.2,
        releaseCurve: 'exponential',
    },
    portamento : 0,
    volume: -2,
}).toMaster();
const notes = ['c3', 'e3', 'g3', 'a3'];

const getBaseEggDrawable = () => new ComboDrawable([
    new DrawCircle({x: 0, y: -10}, 10, 0, Math.PI),
    new DrawEllipse({x: 0, y: -10}, {x: 10, y: 20}, Math.PI, 2 * Math.PI),
]);

export class Egg extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'egg';
        this.drawable = getBaseEggDrawable();
        this.lastScale = 1;
        this.desiredScale = 1;
    }

    firstUpdate() {
        const note = this.controller.random.pick(notes);
        synth.triggerAttackRelease(note, '1n');
    }

    update(dt) {
        super.update(dt);

        if (!this.active) {
            return;
        }

        const lastDesired = this.desiredScale;

        const numPeople = this.controller.entities.filter(e => e instanceof Person && e.active).length;
        const extraPeople = clamp(numPeople - 1, 0, Infinity);
        this.desiredScale = 1 + 0.5 * extraPeople;

        const scale = slurp(this.lastScale, this.desiredScale, 0.05);
        
        if (scale != this.lastScale) {
            this.drawable = getBaseEggDrawable();
            this.drawable.scale(scale);
            this.lastScale = scale;
        }

        if (lastDesired != this.desiredScale) {
            const note = this.controller.random.pick(notes);
            synth.triggerAttackRelease(note, '1n');
            setTimeout(() => synth.releaseAll(), 3000);

            if (numPeople > 3 && numPeople % 2 == 0) {
                const bb = new BabyMountain(this.controller);
                let dist = 100;
                let point = null;
                while (point == null) {
                    const randomEntity = this.controller.random.pick(this.controller.entities);
                    point = randomEntity.tryGetFreeNearbyPoint(dist, 0.8 * dist);
                    dist *= 1.1;
                }
                bb.position = point;
                this.controller.newEntities.push(bb);
            }
        }
    }

    touchingPoint(point) {
        const xDiff = point.x - this.position.x;
        const yDiff = point.y - (this.position.y - 10 * this.desiredScale); 
        const sqDist = (xDiff * xDiff + yDiff * yDiff);
        return sqDist < 12 * 12 * this.desiredScale * this.desiredScale
    }

       handleClick() {
        // ALL PEOPLE GO TO THE EGG
        const note = this.controller.random.pick(notes);
        synth.triggerAttackRelease(note, '1n');
        setTimeout(() => synth.releaseAll(), 3000);

        const people = this.controller.entities.filter(e => e instanceof Person);
        for (const person of people) {
            // EGG
            person.setGoal(this);
            person.behaviour.desiredDist = 20 * this.desiredScale;
        }
    }
}