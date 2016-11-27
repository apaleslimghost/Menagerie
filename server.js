import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.babel.js';

const server = new WebpackDevServer(webpack(config), {
	hot: true,
	publicPath: config.output.publicPath,
	historyApiFallback: true
}).listen(3000, () => console.log('listening'));
