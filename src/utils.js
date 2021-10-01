// Colors

const rgbToColor = ({r, g, b}) => {
	return `rgb(${r},${g},${b})`;
};

// Text

export const buildFont = ({size, font}) => {
	return `${size}px ${font}`;
}

// Objects

export const mergeObjects = (obj1, obj2) => {
	for (const key in obj1) {
		if (!obj1.hasOwnProperty(key) || typeof obj2[key] === 'undefined') {
			continue;
		}

		// Check array first! typeof [] === 'object'!
		if (Array.isArray(obj1[key])) {
			if (!Array.isArray(obj2[key])) {
				throw new Error(`Setting wrong typed config value [${key}]!`);
			}
			obj1[key] = obj1[key].concat(obj2[key]);
		} else if (typeof obj1[key] === 'object') {
			if (typeof obj2[key] !== 'object') {
				throw new Error(`Setting wrong typed config value [${key}]!`);
			}
			obj1[key] = mergeObjects(obj1[key], obj2[key]);
		} else {
			if (typeof obj1[key] !== typeof obj2[key]) {
				throw new Error(`Setting wrong typed config value [${key}]!`);
			}
			obj1[key] = obj2[key];
		}
	}

	return obj1;
}