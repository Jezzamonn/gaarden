import Controller from "./controller";
import { clonePoint, slurp, experp, clamp } from "./util";
import { MouseEntity } from "./entity/mouse";

const DEFAULT_SIZE = 500;

export class Camera {

    /**
     * @param {Controller} controller 
     */
    constructor(controller) {
        this.controller = controller;
        this.position = {x: 0, y: 0};
        this.zoom = 1;

        this.desiredPosition = {x: 0, y: 0};
        this.desiredZoom = 1;

        this.updateSpeed = 0.05;
    }

    update(dt) {
        this.updatePositions();

        this.showAll();
    }

    updatePositions() {
        this.position.x = slurp(this.position.x, this.desiredPosition.x, this.updateSpeed);
        this.position.y = slurp(this.position.y, this.desiredPosition.y, this.updateSpeed);
        this.zoom = experp(this.zoom, this.desiredZoom, this.updateSpeed);
    }

    showAll() {
        const entities = this.controller.entities.filter(e => !(e instanceof MouseEntity));
        if (entities.length == 0) {
            return;
        }

        let top = clonePoint(entities[0].position);
        let bottom = clonePoint(entities[0].position);

        for (const entity of entities) {
            if (entity.position.x < top.x) {
                top.x = entity.position.x;
            }
            if (entity.position.y < top.y) {
                top.y = entity.position.y;
            }
            if (entity.position.x > bottom.x) {
                bottom.x = entity.position.x;
            }
            if (entity.position.y > bottom.y) {
                bottom.y = entity.position.y;
            }
        }
        this.desiredPosition = {
            x: slurp(top.x, bottom.x, 0.5),
            y: slurp(top.y, bottom.y, 0.5),
        }
        const minimumWindowWidth = clamp(0.8 * window.innerWidth, 0, 500);
        const minimumWindowHeight = clamp(0.8 * window.innerHeight, 0, 500);
        const width = clamp(bottom.x - top.x, minimumWindowWidth, Infinity);
        const height = clamp(bottom.y - top.y, minimumWindowHeight, Infinity);
        const xScale = DEFAULT_SIZE / width;
        const yScale = DEFAULT_SIZE / height;
        this.desiredZoom = 0.9 * Math.max(xScale, yScale);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    transformContext(context) {
		context.scale(this.zoom, this.zoom);
		context.translate(-this.position.x, -this.position.y);
    }

    /**
     * Translates a camera-relative point to a game world point
     */
    pointToGameCoords(point) {
        return {
            x: (point.x / this.zoom + this.position.x),
            y: (point.y / this.zoom + this.position.y),
        }
    }


}