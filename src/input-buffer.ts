import {Measurer} from "./measurer";
import {Terminal} from "./terminal";
import {buildFont, rgbToColor} from "./utils";

export class InputBuffer {

    #buffer: Array<string> = [
        "sadasdsadas",
        "asdasdas",
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam at arcu a est sollicitudin euismod. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Integer pellentesque quam vel velit. Fusce suscipit libero eget elit. Aliquam ornare wisi eu metus. Mauris elementum mauris vitae tortor. Praesent dapibus. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Phasellus et lorem id felis nonummy placerat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat."
    ];

    terminal: Terminal;
    measurer: Measurer;

    constructor(terminal: Terminal) {
        this.terminal = terminal;
        this.measurer = new Measurer(terminal);
    }

    /**
     * Allows us to iterate over InputBuffer object
     * @returns {Generator<*, void, *>}
     */
    * [Symbol.iterator](): Generator {
        const canvasHeight = this.terminal.canvas.height;
        const canvasWidth = this.terminal.canvas.width;

        let index: number = 0;

        for (const line of this.#buffer) {
            const lineWidth = this.measurer.measureLine(line);

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
            index += (this.terminal.config.text.linePadding + this.terminal.config.text.font.size);
        }
    }
}