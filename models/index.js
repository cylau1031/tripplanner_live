const db = require('./_db')

// write some models here?
const Place = require('./place')
const Hotel = require('./hotel')
const Activity = require('./activity')
const Restaurant = require('./restaurant')

Hotel.belongsTo(Place)
Place.hasMany(Hotel)

Restaurant.belongsTo(Place)
Activity.belongsTo(Place)
// this is good for associations:
// https://gist.github.com/joedotjs/4a57c5e2037fa15a25fe52131a21ae91
// two things - the foreign keys, and the magic methods

module.exports = db

// This was the hardest part
