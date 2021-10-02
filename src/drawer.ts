import {Terminal} from "./terminal";
import {InputBuffer} from "./input-buffer";
import {buildFont, rgbToColor} from "./utils";

export class Drawer {
    terminal: Terminal;

    constructor(terminal: Terminal) {
        this.terminal = terminal;
    }

    draw(inputBuffer: InputBuffer): void {
        this.#drawBackground();

        let index: number = 0;

        for (const line of inputBuffer) {
            this.terminal.canvas.ctx.textBaseline = "top";
            this.terminal.canvas.ctx.font = buildFont(
                this.terminal.config.text.font
            );
            this.terminal.canvas.ctx.fillStyle = rgbToColor(
                this.terminal.config.text.color
            )
            this.terminal.canvas.ctx.fillText(
                line,
                this.terminal.config.canvas.padding,
                this.terminal.config.canvas.padding + index
            );
            index += (this.terminal.config.text.lineSpacing + this.terminal.config.text.font.size);
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