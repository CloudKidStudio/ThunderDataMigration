var _ = require('lodash');

module.exports = function(table, schema, callback, filter)
{
	// Remove all categories
	schema.remove({}, function(){});

	// Create a map
	var map = {};
	var len = table.length;

	_.each(table, function(data){
		if (filter) filter(data);
		var category = new schema(data);
		category.save(function(err, result){
			if (err)
			{
				console.log(String(err).red);
				process.exit(1);
			}
			len--;
			map[data.id] = result._id;
			if (!len) {
				callback(map);
			}
		});
	});
};