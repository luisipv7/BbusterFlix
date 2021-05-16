const routes = require('express').Router()
const User = require('./controller/user.controller')
const Movie = require('./controller/movie.controller')
const Auth = require('./controller/auth/auth.controller')

routes.post('/create/user', User.create)
routes.post('/login', User.login)
routes.post('/logout', User.logout)

routes.get('/movies', Auth.authenticateToken, Movie.findAll)
routes.put('/movies/rent/:id', Auth.authenticateToken, Movie.rent)
routes.put('/movies/giveBack/:id', Auth.authenticateToken, Movie.giveBack)

module.exports = routes
