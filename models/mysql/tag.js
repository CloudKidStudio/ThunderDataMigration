var sql = require('sql');

module.exports = sql.create('mysql').define({
	name: 'tags',
	columns: [
		{
			name: 'tag_id',
			property: 'id'
		},
		'name',
		'uri'
	]
});