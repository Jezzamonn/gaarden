import { clamp } from "../util";

// The two safe draws make an infinite loop so make sure you define one of them
export class Drawable {

    get length() {
        return 0;
    }

    scale(scale) {}

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context, startLength, endLength) {
        const length = this.length;
        if (startLength > length) {
            return;
        }
        if (endLength < 0) {
            return;
        }
        if (startLength > endLength) {
            // invalid but w/e
            return;
        }
        startLength = clamp(startLength, 0, length);
        endLength = clamp(endLength, 0, length);
        this.safeDraw(context, startLength, endLength);
    }

    safeDraw(context, startLength, endLength) {
        const length = this.length;
        if (length <= 0) {
            return;
        }
        this.safeDrawAmt(context, startLength / length, endLength / length);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    drawAmt(context, startAmt, endAmt) {
        if (startAmt > 1) {
            return;
        }
        if (endAmt < 0) {
            return;
        }
        if (startAmt > endAmt) {
            // invalid but w/e
            return;
        }
        startAmt = clamp(startAmt, 0, 1);
        endAmt = clamp(endAmt, 0, 1);
        this.safeDrawAmt(context, startAmt, endAmt);
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     */
    safeDrawAmt(context, startAmt, endAmt) {
        const length = this.length;
        this.safeDraw(context, startAmt * length, endAmt * length);
    }


}