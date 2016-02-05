/* 
 * @Author: Dodik Gaghan
 * @Date:   2016-02-04 16:05:33
 * @Last Modified by:   Dodik Gaghan
 * @Last Modified time: 2016-02-05 14:31:07
 */

'use strict';

var express = require('express');
var http = require('http');
var ECT = require('ect');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var config = require('./config');
var app = exports.app = express();
var server = http.createServer(app);

var ectRenderer = ECT({
	watch: true,
	root: config.root + '/app/views',
	ext: '.html',
	open: '{{',
	close: '}}',
});
app.set('view engine', 'html');
app.engine('html', ectRenderer.render);
app.set('views', config.root + '/app/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(config.root + '/public'));
app.use(methodOverride());

require('deployd').attach(server, {
	env: config.env,
	db: config.db
});
console.log('Using MongoDB:', config.db);

app.dpd = require('dpd-js-sdk')('http://localhost:3000', '/');
app.controllers = require(config.root + '/app/controllers')(app);
require(config.root + '/app/routes.js')(app);

app.use(server.handleRequest);

var listener = app.listen(config.port, function() {
	console.log('Express & Deployd started.\n\nPlease visit http://%s:%s', listener.address().address, listener.address().port);
});