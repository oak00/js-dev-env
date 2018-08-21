import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default{
	/* Enables debug information */
	debug: true,
	/* Maps transpiled code back to source files */
	devtool: 'source-map',
	/* Display list of all files its bundling */
	noInfo: false,
	/* Application entry point */
	entry: {
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index')
	},
	target: 'web',
	/* Tells webpack where it should create dev bundle */
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js' // References entry point names
	},
	plugins: [
		// Generate an external css file with a hash in the file name
		new ExtractTextPlugin('[name].[contenthash].css'),

		// Hash the files using MD5 so that their names change when the content change
		new WebpackMd5Hash(),

		//Use CommonChunksPlugin to create a separate bundle
		// of vendor libraries so that they're cached separately.
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),

		// Create HTML file that includes reference to builded JS.
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			minify:{
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,

			//Properties you define here are available in index.html
			// using htmlWebpackPlugin.options.varName
			trackJSToken: '1a53b628a18f4d5792aea230dfef638c'

		}),

		// Eliminate duplicate packages when generating bundle
		new webpack.optimize.DedupePlugin(),

		// Minify JS
		new webpack.optimize.UglifyJsPlugin()
	],
	/* Tells webpack the filetypes we want it to handle */
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
		]
	}
}
