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
}