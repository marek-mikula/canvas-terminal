import {Canvas} from "./canvas";

export const canvasFactory = (terminal, id) => {
	const element = document.getElementById(id);

	if (element === null) {
		throw new Error("No element found matching given element ID.");
	}

	if (element.tagName !== 'CANVAS') {
		throw new Error("Terminal element cannot be mounted on a different element than canvas.");
	}

	return new Canvas(terminal, element);
};