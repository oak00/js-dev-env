import express from 'express';
import path from 'path';
import open from'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

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

// Fake Production API
app.get('/users', function(req, res){
	// hard coding for simplicity. pretend this hits a real database
	res.json([
		{"id": 1,"firstName":"Bob","lastName":"Smith","email":"bob@gmail.com"},
		{"id": 2,"firstName":"Tammy","lastName":"Norton","email":"tnorton@gmail.com"},
		{"id": 3,"firstName":"Tina","lastName":"Lee","email":"lee.tina@gmail.com"}
	]);
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
