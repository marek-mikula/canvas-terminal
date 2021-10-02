import {buildFont} from "./utils";
import {Terminal} from "./terminal";

export class Measurer {

	terminal: Terminal;

	constructor(terminal: Terminal) {
		this.terminal = terminal;
	}

	measureLine(line: string): number {
		this.terminal.canvas.ctx.font = buildFont(
			this.terminal.config.text.font
		)
		return this.terminal.canvas.ctx.measureText(line).width;
	}


}