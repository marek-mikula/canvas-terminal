export class Canvas {
	ctx; terminal;

	constructor(terminal, canvasElement) {
		this.terminal = terminal;
		this.ctx = canvasElement.getContext('2d')
	}
}