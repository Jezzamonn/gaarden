import { Drawable } from "./drawable";

export class ComboDrawable extends Drawable {

    /**
     * @param {Array<Drawable>} drawables 
     */
    constructor(drawables) {
        super();
        this.drawables = drawables;
    }

    get length() {
        return this.drawables.map(d => d.length).reduce((a, b) => a + b, 0);
    }
    
    scale(scale) {
        for (const drawable of this.drawables) {
            drawable.scale(scale);
        }
    }

    safeDraw(context, startLength, endLength) {
        for (const drawable of this.drawables) {
            const length = drawable.length;
            drawable.draw(context, startLength, endLength);
            startLength -= length;
            endLength -= length;
        }
    }
}