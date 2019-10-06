import { Entity } from "./entity";
import { ComboDrawable } from "../draw/combodrawable";
import { DrawLine } from "../draw/drawline";
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
        attack : 0.30,
        decay : 0,
        sustain : 1,
        release : 2.5,
        releaseCurve: 'exponential',
    },
    portamento : 0,
    volume: -6,
}).toMaster();

const notes = ['c3', 'e3', 'g3'];

window.synth = synth;

export class Mountain extends Entity {
    constructor(controller) {
        super(controller);
        this.debugName = 'mountain';
        this.drawable = new DrawPoly([{x: -50, y: 0}, {x: 0, y: -100}, {x: 50, y: 0}], {closed: false});
    }

    firstUpdate() {
        const note = this.controller.random.pick(notes);
        synth.triggerAttackRelease(note, '1n');
        setTimeout(() => synth.releaseAll(), 2000);
    }
}