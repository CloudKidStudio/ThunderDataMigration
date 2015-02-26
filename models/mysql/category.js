var sql = require('sql');

module.exports = sql.create('mysql').define({
	name: 'categories',
	columns: [
		{
			name: 'category_id',
			property: 'id'
		},
		'name',
		'uri',
		'total',
		'created'
	]
});