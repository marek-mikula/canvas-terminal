import {Terminal} from "./terminal";

export class Canvas {
    ctx: CanvasRenderingContext2D;
    terminal: Terminal;
    element: HTMLCanvasElement;

    constructor(terminal: Terminal, canvasElement: HTMLCanvasElement) {
        this.terminal = terminal;
        this.element = canvasElement;
        this.ctx = <CanvasRenderingContext2D>canvasElement.getContext('2d')
    }

    get height(): number {
        return this.element.clientHeight;
    }

    get width(): number {
        return this.element.clientWidth;
    }

    get letterWidth(): number {
        return this.terminal.buffer.measurer.measureChars('A');
    }

    get maxLineWidth(): number {
        return this.width - (2 * this.letterWidth);
    }

    get maxCharsWidth(): number {
        return Math.ceil(this.maxLineWidth / this.letterWidth);
    }

    /**
     * Returns maximum number of lines that can be shown
     * in terminal
     */
    get maxLines(): number {
        return Math.floor((
            this.terminal.canvas.height - (2 * this.terminal.config.canvas.padding)) / (this.terminal.config.text.font.size + this.terminal.config.text.lineSpacing)
        );
    }
}