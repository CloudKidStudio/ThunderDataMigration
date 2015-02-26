var sql = require('sql');

module.exports = sql.create('mysql').define({
	name: 'sounds',
	columns: [
		{
			name: 'sound_id',
			property: 'id'
		},
		'name',
		'uri',
		{
			name:'asset_id',
			property:'assetId'
		},
		'type',
		{
			name: 'category_id',
			property: 'category'
		},
		'user_id',
		'size',
		'created',
		'updated'
	]
});