// require all node module stuff
const express = require('express')
const nunjucks = require('nunjucks')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

// require my code (e.g. db and routes)
const db = require('./models')
const routes = require('./routes')

// make an app instance of express
const app = express()

// do middleware
// logging
app.use(morgan('dev'))
// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// set up template engine
nunjucks.configure('views', {noCache: true})
app.set('view engine', 'html')
app.engine('html', nunjucks.render)

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))
app.use('/jQuery', express.static(path.join(__dirname, 'node_modules/jQuery/dist')))
app.use(express.static(path.join(__dirname, 'public')))

// do routes
app.use(routes)

// In Express, 404 responses are not the result of an error, 
// so the error-handler middleware will not capture them. 
// This behavior is because a 404 response simply indicates the absence of 
// additional work to do; in other words, 
// Express has executed all middleware functions and routes, 
// and found that none of them responded. 
// All you need to do is add a middleware function at the very bottom of the stack 
// (below all other functions) to handle a 404 response:
app.use(function(req, res, next){
	const err = new Error('no findy')
	next(err)
})

app.use(function(err, req, res, next){
	res.render('error', {error: err})
})

// do app.listen (inside a db.sync)
db.sync()
	.then(function(){
		app.listen(3000, function(){
			console.log('keeping it 3000')
		})
	})
