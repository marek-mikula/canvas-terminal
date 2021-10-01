import {buildFont} from "./utils";

export class Measurer {

	terminal;

	constructor(terminal) {
		this.terminal = terminal;
	}

	measureLine(line) {
		this.terminal.canvas.ctx.font = buildFont(
			this.terminal.config.text.font
		)
		return this.terminal.canvas.ctx.measureText(line).width;
	}


}