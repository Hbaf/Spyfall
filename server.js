const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const instance = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
});

app.use(instance);

app.listen(3000, function () {
	console.log('Example app listening on port 3000!\n');
});

// Stub to make things work
// There was a problem, when going to url like '/route' causes 'Cannot GET /route'
//
// !Important! That page we sending here is not rendered. It's empty template.
// Needs to be fixed, if bundles config changes
//
// TODO fix that (find better solution)
app.get('/*', function(req, res) {
	instance.invalidate();
	res.sendFile(path.join(config.output.path, 'index.html'), function(err) {
		if (err) {
			res.status(500).send(err)
		}
	})
})
