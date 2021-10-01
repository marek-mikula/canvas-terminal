interface ConfigInterface extends StringAccessibleInterface {
    frequency: number,
    canvas: {
        background: ColorInterface,
        padding: number,
    },
    text: {
        color: ColorInterface,
        font: FontInterface,
        linePadding: number,
    }
}