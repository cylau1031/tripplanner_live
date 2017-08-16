const db = require('./_db')
const Sequelize = require('sequelize')
const Place = require('./place.js')

const Hotel = db.define('hotel', {
	name: {
		type: Sequelize.STRING
	},
	num_stars: {
		type: Sequelize.FLOAT,
		validate: {
			min: 0.0,
			max: 5.0
		}
		// the point of range is to be able to do overlaps, joins, etc.
	},
	amenities: {
		type: Sequelize.STRING
	}
}, {
	defaultScope: {
		include: [Place]
	}
})


module.exports = Hotel
