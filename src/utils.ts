// Colors

const rgbToColor = ({r, g, b}: ColorInterface) => {
    return `rgb(${r},${g},${b})`;
};

// Text

export const buildFont = ({size, font}: FontInterface) => {
    return `${size}px ${font}`;
}

// Objects

export const mergeConfig = (obj1: ConfigInterface, obj2: StringAccessibleInterface): ConfigInterface => {
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
        } else {
            if (typeof obj1[key] === 'object') {
                if (typeof obj2[key] !== 'object') {
                    throw new Error(`Setting wrong typed config value [${key}]!`);
                }
                obj1[key] = mergeConfig(obj1[key], obj2[key]);
            } else {
                if (typeof obj1[key] !== typeof obj2[key]) {
                    throw new Error(`Setting wrong typed config value [${key}]!`);
                }
                obj1[key] = obj2[key];
            }
        }
    }

    return <ConfigInterface>obj1;
}