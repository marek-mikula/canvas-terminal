import {canvasFactory} from "./factories";
import {mergeConfig} from "./utils";
import {InputBuffer} from "./input-buffer";
import {Drawer} from "./drawer";
import {Canvas} from "./canvas";

const defaultConfig = {
    frequency: 25,
    canvas: {
        background: {
            r: 0,
            g: 0,
            b: 0,
        },
        padding: 5,
    },
    text: {
        color: {
            r: 255,
            g: 255,
            b: 255,
        },
        font: {
            size: 15,
            font: 'monospace' // should be only monospaced fonts
        },
        linePadding: 3,
    }
};

export class Terminal {

    buffer: InputBuffer = new InputBuffer(this);

    drawer: Drawer = new Drawer(this);

    canvas: Canvas;

    config: ConfigInterface;

    #interval: number;

    constructor(selector: string, config = {}) {
        this.canvas = canvasFactory(this, selector);
        this.config = mergeConfig(defaultConfig, config);

        this.#interval = window.setInterval(
            this.drawer.draw.bind(this.drawer),
            this.config.frequency,
            this.buffer
        )
    }
}