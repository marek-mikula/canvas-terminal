const path = require('path');

module.exports = {
	mode: "development", // production
	entry: {
		"app": path.resolve(__dirname, 'src/app.ts')
	},
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				include: path.resolve(__dirname, 'src')
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	}
}