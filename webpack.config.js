const path = require('path');

module.exports = {
	mode: "development", // production
	entry: {
		"canvas-terminal": path.resolve(__dirname, 'src/canvas-terminal.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	}
}