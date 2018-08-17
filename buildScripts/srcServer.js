import express from 'express';
import path from 'path';
import open from'open';

var port = 3000;
var app = express();

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
