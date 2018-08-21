import express from 'express';
import path from 'path';
import open from'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config);

// Webpack configuration
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

/**
 * Request root, sends file to response path.
 * __dirname is always the directory in which currently executing script resides
 */
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../src/index.html'))

});

/**
 * Sets Express to listen on port specified. Includes error handling
 */
app.listen(port, function(err){
	if(err){
		console.log(err)
	} else {
		open('http://localhost:' + port);
	}
})
