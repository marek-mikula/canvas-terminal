interface ConfigInterface extends StringAccessibleInterface {
    name: string,
    frequency: number,
    canvas: {
        background: ColorInterface,
        padding: number,
    },
    text: {
        color: ColorInterface,
        font: FontInterface,
        lineSpacing: number,
    },
    marker: {
        template: string,
    }
}