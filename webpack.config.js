const path = require('path');

module.exports = {
	mode: "development", // production
	entry: {
		"app": path.resolve(__dirname, 'src/app.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	}
}