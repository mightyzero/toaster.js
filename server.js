var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Import models
var User = require('./app/user/user-model');


// Database configuration
var db = mongoose.connect('mongodb://localhost/data');

// Configure Express servers
var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var router = express.Router();

router.route('/users')
	.post(function onPost(req, res) {
		var user = new User(req.body);

		console.log(user);
		res.send(user);
	})
	.get(function onGet(req, res) {
		User.find(function onReturn(err, users) {
			if (err)
				res.status(500).send(err);
			else
				res.json(users);
		});
	});

app.use('/api', router);

app.get('/', function(req, res) {
	res.send('Hello Word');
});


// Server application configuration
var host = process.env.IP   || '127.0.0.1';
var port = process.env.PORT || 8080;
var backlog = 511;                     // Max # of pending connections


// Start server listening
app.listen(port, host, backlog, function() {
	console.log('Toaster running on port ' + port);
});
