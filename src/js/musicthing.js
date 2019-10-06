import Tone from 'tone'
import Controller from './controller';

export class MusicThing {

    /**
     * @param {Controller} controller 
     */
    constructor(controller) {
        this.controller = controller;
        this.count = 0;
        this.synth = new Tone.Synth().toMaster();
    }

    update(dt) {
        if (this.controller.random.bool(0.01)) {
            this.synth.triggerAttackRelease("C4", "8n");
        }
    }


}