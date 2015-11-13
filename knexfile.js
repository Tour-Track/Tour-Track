module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database: 'tourtrack_dev'
		},
        seeds: {
            directory: './server/Seeds'
        }
	}
}