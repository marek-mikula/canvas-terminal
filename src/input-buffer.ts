import {Measurer} from "./measurer";
import {Terminal} from "./terminal";
import {chunkStr} from "./utils";

export class InputBuffer {

    #buffer: Array<string> = [
        "sadasdsadas",
        "asdasdas",
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam at arcu a est sollicitudin euismod. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Integer pellentesque quam vel velit. Fusce suscipit libero eget elit. Aliquam ornare wisi eu metus. Mauris elementum mauris vitae tortor. Praesent dapibus. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Phasellus et lorem id felis nonummy placerat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat."
    ];

    #markerPlaceholders: Array<MarkerPlaceholderInterface> = [
        {
            name: 'user',
            fn: (): string => 'guest'
        },
        {
            name: 'canvasName',
            fn: (): string => this.terminal.config.name
        },
    ];

    /**
     * Buffer offset to shift showing lines
     * when pressing key UP or DOWN
     * @private
     */
    #bufferOffset: number = 0;

    terminal: Terminal;
    measurer: Measurer;

    constructor(terminal: Terminal) {
        this.terminal = terminal;
        this.measurer = new Measurer(terminal);
    }

    /**
     * Allows us to iterate over InputBuffer object
     * @returns {GeneratorFunction<*, void, *>}
     */
    * [Symbol.iterator](): Generator<string> {
        const maxCharsWidth = this.terminal.canvas.maxCharsWidth;
        const marker = this.#buildMarker();

        for (const line of this.#buffer) {
            const lineWithMarker = marker + ' ' + line;
            if (lineWithMarker.length > maxCharsWidth) {
                for (const multiLine of chunkStr(lineWithMarker, maxCharsWidth)) {
                    yield multiLine;
                }
            } else {
                yield lineWithMarker;
            }
        }
    }

    increaseOffset(): void {
        if (this.terminal.canvas.maxLines + this.#bufferOffset < this.linesNumber) {
            this.#bufferOffset++;
        }
    }

    decreaseOffset(): void {
        if (this.#bufferOffset > 0) {
            this.#bufferOffset--;
        }
    }

    /**
     * Adds one line to buffer
     * @param line
     */
    addLine(line: string): void {
        // Remove first element when the buffer is overflowing
        if (this.linesNumber === this.terminal.config.buffer.maxBufferSize) {
            this.#buffer.shift();
        }
        this.#buffer.push(line);
    }

    /**
     * TODO kinda inefficient
     */
    get linesNumber(): number {
        let i = 0;
        for (const _ of this) {
            i++;
        }
        return i;
    }

    get offset(): number {
        return this.#bufferOffset;
    }

    #buildMarker(): string {
        let template = this.terminal.config.marker.template;
        for (const placeholder of this.#markerPlaceholders) {
            const expr = `{${placeholder.name}}`;
            const regex = new RegExp(expr, 'g');

            if (template.match(regex)) {
                template = template.replace(regex, placeholder.fn());
            }
        }
        return template;
    }
}