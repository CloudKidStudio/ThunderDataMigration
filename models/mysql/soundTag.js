var sql = require('sql');

module.exports = sql.create('mysql').define({
	name: 'sound_tags',
	columns: [
		{
			name: 'sound_id',
			property: 'sound'
		},
		{
			name: 'tag_id',
			property: 'tag'
		}
	]
});