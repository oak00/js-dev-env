import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default{
	/* Enables debug information */
	debug: true,
	/* Maps transpiled code back to source files */
	devtool: 'inline-source-map',
	/* Display list of all files its bundling */
	noInfo: false,
	/* Application entry point */
	entry: [
		path.resolve(__dirname, 'src/index')
	],
	target: 'web',
	/* Tells webpack where it should create dev bundle */
	output: {
		path: path.resolve(__dirname, 'src'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [

		//Create HTML file that includes reference to bundled JS.
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true
		})
	],
	/* Tells webpack the filetypes we want it to handle */
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
			{test: /\.css$/, loaders: ['style', 'css']}
		]
	}
}
