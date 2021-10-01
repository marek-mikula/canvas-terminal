import {Terminal} from "./terminal";
import {InputBuffer} from "./input-buffer";

export class Drawer {
	terminal;

	constructor(terminal: Terminal) {
		this.terminal = terminal;
	}

	draw(inputBuffer: InputBuffer) {
		for (const line of inputBuffer) {
			console.log(line);
		}
	}

}