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
				"type" : "amtriangle",
				"harmonicity" : 1,
				"modulationType" : "square"
			},
			"envelope" : {
				"attackCurve" : "exponential",
				"attack" : 0.1,
				"decay" : 0.2,
				"sustain" : 0.2,
				"release" : 1.5,
			},
			"portamento" : 0
		}).toMaster();
    }

    update(dt) {
        const notes = ['c5', 'd5', 'e5', 'g5', 'a5'];
        if (this.controller.random.bool(0.01)) {
            const note = this.controller.random.pick(notes);
            this.synth.triggerAttackRelease(note, '4n');
        }
    }


}