// Colors

export const rgbToColor = ({r, g, b}: ColorInterface): string => {
    return `rgba(${r},${g},${b},1)`;
};

// Text

export const buildFont = ({size, font}: FontInterface): string => {
    return `${size}px ${font}`;
}

export const chunkStr = (string: string, length: number): Array<string> => {
    const pattern = `.{1,${length}}`;
    const res = string.match(new RegExp(pattern, 'g'));
    return res !== null ? res : [];
};

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