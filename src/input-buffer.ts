import {Measurer} from "./measurer";
import {Terminal} from "./terminal";

export class InputBuffer {

    #lines = [
        "sadasdsadas",
        "asdasdas",
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam at arcu a est sollicitudin euismod. Fusce dui leo, imperdiet in, aliquam sit amet, feugiat eu, orci. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Integer pellentesque quam vel velit. Fusce suscipit libero eget elit. Aliquam ornare wisi eu metus. Mauris elementum mauris vitae tortor. Praesent dapibus. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Phasellus et lorem id felis nonummy placerat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat."
    ];

    terminal;
    measurer;

    constructor(terminal: Terminal) {
        this.terminal = terminal;
        this.measurer = new Measurer(terminal);
    }

    /**
     * Allows us to iterate over InputBuffer object
     * @returns {Generator<*, void, *>}
     */
    * [Symbol.iterator]() {
        for (const line of this.#lines) {
            const lineWidth = this.measurer.measureLine(line);
        }
    }
}