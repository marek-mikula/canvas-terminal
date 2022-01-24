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

        const linesLength: number = inputBuffer.linesNumber;
        const maxLines: number = this.terminal.canvas.maxLines;

        let skipLines: number = linesLength - maxLines - inputBuffer.offset;

        let additionalPadding: number = 0;
        let linesShown: number = 0;
        for (const line of inputBuffer) {
            // skip lines that should not be visible
            // ship other lines that are overflowing max lines to show
            if (skipLines > 0 || linesShown === maxLines) {
                skipLines--;
                continue;
            }

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
                this.terminal.config.canvas.padding + additionalPadding
            );
            additionalPadding += (this.terminal.config.text.lineSpacing + this.terminal.config.text.font.size);

            linesShown++;
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