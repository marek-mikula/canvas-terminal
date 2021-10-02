import {Terminal} from "./terminal";
import {InputBuffer} from "./input-buffer";
import {rgbToColor} from "./utils";

export class Drawer {
    terminal: Terminal;

    constructor(terminal: Terminal) {
        this.terminal = terminal;
    }

    draw(inputBuffer: InputBuffer): void {
        this.#drawBackground();
        for (const line of inputBuffer) {
            console.log(line);
        }
    }

    #drawBackground(): void {
        this.terminal.canvas.ctx.fillStyle = rgbToColor(
            this.terminal.config.canvas.background
        );
        this.terminal.canvas.ctx.fillRect(
            0,
            0,
            this.terminal.canvas.width,
            this.terminal.canvas.height
        );
    }

}