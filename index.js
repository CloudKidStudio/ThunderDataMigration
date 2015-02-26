var mongoose = require('mongoose'),
	mysql = require('./mysql'),
	colors = require('colors'),
	_ = require('lodash'),
	migrate = require('./migrate');
	Category = require('./models/mongo/category'),
	Sound = require('./models/mongo/sound'),
	Tag = require('./models/mongo/tag');

// Get the MySQL tables
mysql({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'thunder',
		socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock'
	}, 
	function(tables)
	{
		// Connect to mongo database
		mongoose.connect('mongodb://localhost/thunder');
		
		var db = mongoose.connection;
		
		// Check for connection errors
		db.on('error', function(err){
			console.log(String(err).red);
			process.exit(1);
		});

		console.log("MongoDB connected.".yellow);

		var categories, tags, sounds;

		// Save the categories
		migrate(tables.categories, Category, function(map){
			categories = map;
			console.log("Saved categories.".gray);
			// Save the tags
			migrate(tables.tags, Tag, function(map){
				tags = map;
				console.log("Saved tags.".gray);
				// Save the sounds
				migrate(tables.sounds, Sound,
					function(map)
					{
						console.log("Saved sounds.".gray);
						sounds = map;
						// the number of sound tags to process
						var len = tables.soundTags;
						_.each(tables.soundTags, function(data){

							// Add each tag objectid to the sound tags
							Sound.update(
								{_id:sounds[data.sound]}, 
								{ $push: { tags: tags[data.tag] } }, 
								function(err, num){
									len--;
									if (!len)
									{
										console.log("Completed data migration!".yellow);
										process.exit();
									}
								}
							);
						});
					},
					// Filter each sound
					function(data)
					{
						if (data.category && categories[data.category]){
							data.category = categories[data.category];
						}
					}
				);
			});
		});
	}
);