const routes = require('express').Router()
const User = require('./controller/user.controller')
const Movie = require('./controller/movie.controller')
const Auth = require('./controller/auth/auth.controller')

routes.post('/create/user', User.create)
routes.post('/login', User.login)
routes.post('/logout', User.logout)

routes.get('/movies', Movie.findAll)
routes.put('/movies/rent/:id', Movie.rent)
routes.put('/movies/giveBack/:id', Movie.giveBack)

module.exports = routes
