const options = {
	frequency: 25,
	canvas: {
		background: {
			r: 0,
			g: 0,
			b: 0,
		},
		height: 400,
		width: 700,
		padding: 5,
	},
	text: {
		color: {
			r: 255,
			g: 255,
			b: 255,
		},
		font: '15px Consolas'
	}
};

const rgbToColor = ({r, g, b}) => {
	return `rgb(${r},${g},${b})`;
};

const drawBackground = () => {
	canvas.getCtx().beginPath();
	canvas.getCtx().rect(0, 0, options.canvas.width, options.canvas.height);
	canvas.getCtx().fillStyle = rgbToColor(options.canvas.background);
	canvas.getCtx().fill();
};

const typeIndicator = {
	frequency: 450,
	counter: 0,
	shown: false,
	updateState() {
		if (this.counter >= this.frequency) {
			this.shown = !this.shown;
			this.counter = 0;
		} else {
			this.counter += options.frequency;
		}
	},
	draw() {
		this.updateState();
		if (!this.shown) {
			return;
		}
		canvas.getCtx().fillStyle = rgbToColor(options.text.color);
		canvas.getCtx().font = options.text.font;
		canvas.getCtx().fillText("|", 10, 50);
	}
}

const chores = [
	() => drawBackground(),
	() => typeIndicator.draw()
];

const updateFn = () => {
	chores.forEach(chore => chore());
};

class Canvas {
	#canvas = null;
	#ctx = null;

	#interval = null;

	constructor() {
		this.#canvas = document.getElementById('canvas-console');
		this.#ctx = this.getCanvas().getContext('2d');
		this.setCanvasWidth(options.canvas.width);
		this.setCanvasHeight(options.canvas.height);
	};

	getCanvas() {
		return this.#canvas;
	};

	getCtx() {
		return this.#ctx;
	};

	setCanvasHeight(height) {
		this.#canvas.setAttribute('height', height);
	}

	setCanvasWidth(width) {
		this.#canvas.setAttribute('width', width);
	}

	switchInterval() {
		if (this.#interval === null) {
			this.startInterval();
		} else {
			this.clearInterval();
		}
	};

	startInterval() {
		this.#interval = setInterval(updateFn, options.frequency);
	};

	clearInterval() {
		clearInterval(this.#interval);
		this.#interval = null;
	};

	start() {
		this.startInterval();
	};
}

let canvas = new Canvas();

canvas.start();
