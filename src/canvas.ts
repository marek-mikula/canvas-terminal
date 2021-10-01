import {Terminal} from "./terminal";

export class Canvas {
    ctx: CanvasRenderingContext2D;
    terminal: Terminal;

    constructor(terminal: Terminal, canvasElement: HTMLCanvasElement) {
        this.terminal = terminal;
        this.ctx = <CanvasRenderingContext2D>canvasElement.getContext('2d')
    }
}