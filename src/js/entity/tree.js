import { Entity } from "./entity";
import { Person } from "./person";
import { clonePoint } from "../util";
import { Animal } from "./animal";
import { TreeCluster } from "./treecluster";
import { DrawPoly } from "../draw/drawpoly";
import Tone from 'tone';

const synth = new Tone.PolySynth(4, Tone.Synth, {
    oscillator : {
        type : 'amsawtooth',
        partialCount : 5,
        modulationType: 'square',
        harmonicity: 1,
    },
    envelope : {
        attackCurve : 'linear',
        attack : 0.10,
        decay : 0,
        sustain : 1,
        release : 2.5,
        releaseCurve: 'exponential',
    },
    portamento : 0,
    volume: -6,
}).toMaster();

const notes = ['c4', 'e4', 'g4', 'a4'];

export class Tree extends Entity {

    constructor(controller, cluster) {
        super(controller);
        this.cluster = cluster;

        this.drawable = new DrawPoly([
            {x: -10, y: 0},
            {x: 0, y: -40},
            {x: 10, y: 0},
        ], {closed: true});

        this.windCount = 0;
        this.windSpeed = controller.random.real(5, 5.1);
    }

    update(dt) {
        super.update(dt);

        this.windCount += dt;
    }

    firstUpdate() {
        this.cluster.spawnNextEntity(this);

        const note = this.controller.random.pick(notes);
        synth.triggerAttackRelease(note, '16n');
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    localRender(context) {
        const wind = 0.02 * Math.sin(2 * Math.PI * this.windCount / this.windSpeed);
        context.transform(1, 0, wind, 1, 0, 0);
        super.localRender(context);
    }

}