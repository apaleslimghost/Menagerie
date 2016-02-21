module.exports = {
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015', 'react-hmre']
				}
			},
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},
	entry: {
		app: ['./index.jsx']
	},
	output: {
		path: './build',
		filename: "bundle.js"
	},
	devServer: {
		historyApiFallback: true
	}
};
