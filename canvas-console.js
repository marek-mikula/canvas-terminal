const options = {
    frequency: 50,
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
};

const strokeStyleRGB = ({r, g, b}) => {
    return `rgb(${r},${g},${b})`;
};

const updateFn = () => {
    canvas.drawBackground();
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

    setCanvas(canvas) {
		this.#canvas = canvas;
	};

    getCanvas() {
		return this.#canvas;
	};

	getCtx() {
		return this.#ctx;
	};

	setCtx(ctx) {
		this.#ctx = ctx;
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

    drawBackground() {
        this.#ctx.beginPath();
        this.#ctx.rect(0, 0, options.canvas.width, options.canvas.height);
        this.#ctx.fillStyle = strokeStyleRGB(options.canvas.background);
        this.#ctx.fill();
    };

	start() {
		this.startInterval();
	};
}

let canvas = new Canvas();

canvas.start();
