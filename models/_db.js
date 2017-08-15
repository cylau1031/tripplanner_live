// set up the database in this file
const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/tripplanner')

module.exports = db