var mysql = require('mysql'),
	sql = require('sql'),
	_ = require('lodash');

module.exports = function(config, callback)
{
	console.log("Getting all MySQL tables...".green);

	// Establish a database connection
	var db = mysql.createConnection(config);

	// MySQL Models
	var sound = require('./models/mysql/sound');
	var tag = require('./models/mysql/tag');
	var category = require('./models/mysql/category');
	var soundTag = require('./models/mysql/soundTag');

	var result = {};

	db.connect(function(err){
	    if(err)
	    {
	        console.log(('Error connecting to mysql: ' + err+'\n').red);
	        process.exit(1);
	    }
	    else
	    {
	    	console.log("Connected to MySQL".gray);
	    	init();
	    }
	});

	// The number of tables we're planning of fetching
	var expected = 4;

	// Grab all the data
	function init()
	{
		console.log("Fetching sounds table...".grey);
		db.query(
			sound.select().toString(),
			function(err, sounds)
			{
				ifError(err);
				result.sounds = sounds;
				ifComplete();
			}
		);

		console.log("Fetching categories table...".grey);
		db.query(
			category.select().toString(),
			function(err, categories)
			{
				ifError(err);
				result.categories = categories;
				ifComplete();
			}
		);

		console.log("Fetching soundTags table...".grey);
		db.query(
			soundTag.select().toString(),
			function(err, soundTags)
			{
				ifError(err);
				result.soundTags = soundTags;
				ifComplete();
			}
		);

		console.log("Fetching tags table...".grey);
		db.query(
			tag.select().toString(),
			function(err, tags)
			{
				ifError(err);
				result.tags = tags;
				ifComplete();
			}
		);
	}

	function ifError(err)
	{
		if (err)
		{
			console.error(String(err).red);
			process.exit(1);
		}
	}

	function ifComplete()
	{
		expected--;
		if (!expected)
		{
			console.log("Completed, closing MySQL connection.".green);
			db.end();
			callback(result);
		}
	}
};