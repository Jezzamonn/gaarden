import { Entity } from "../entity/entity";
import Controller from "../controller";

export class Behaviour {

    /**
     * @param {Controller} controller
     * @param {Entity} entity 
     */
    constructor(controller, entity) {
        this.controller = controller;
        this.entity = entity;
    }

    update(dt) {}

}