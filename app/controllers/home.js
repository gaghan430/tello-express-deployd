module.exports = function(app) {

	exports.index = function(req, res, next) {
		app.dpd('/users').get(function(results, error) {
			res.send(results);
		});
	}

	return exports;
}