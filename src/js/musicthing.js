import Tone from 'tone'
import Controller from './controller';

export class MusicThing {

    /**
     * @param {Controller} controller 
     */
    constructor(controller) {
        this.controller = controller;
        this.count = 0;
        this.synth = new Tone.PolySynth(4, Tone.Synth, {
			"oscillator" : {
				"type" : "sine",
			},
			"envelope" : {
				"attackCurve" : "linear",
				"attack" : 0.01,
				"decay" : 0.1,
                'decayCurve': 'exponential',
				"sustain" : 0.1,
                "release" : 1.20,
                'releaseCurve': 'exponential',
			},
            "portamento" : 0,
		}).toMaster();
    }

    update(dt) {
    }

    playNote() {
        const notes = ['c5', 'd5', 'e5', 'g5', 'a5'];
        const note = this.controller.random.pick(notes);
        this.synth.triggerAttackRelease(note, '4n');
}


}