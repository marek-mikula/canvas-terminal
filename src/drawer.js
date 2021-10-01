export class Drawer {
	terminal;

	constructor(terminal) {
		this.terminal = terminal;
	}

	draw(inputBuffer) {
		for (const line of inputBuffer) {
			console.log(line);
		}
	}

}