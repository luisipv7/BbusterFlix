const Models = require('../models/index')
const _ = require('lodash')
const Queue = require('../config/queue')

module.exports = {
  async findAll (req, res) {
    try {
      const titulo = req.body.titulo
      const movies = await Models.Movie.findAll({ raw: true })
      const videoStore = await Models.VideoStore.findAll({ raw: true })
      let idRented = videoStore[0].rented.replace(/[\\"]/g, '').split(',')

      idRented = idRented.map(R => ({
        id: Number(R)
      }))

      let moviesNotRented = _.xorBy(movies, idRented, 'id')

      moviesNotRented = moviesNotRented.filter(R => R.id !== 0)

      if (titulo) {
        const movieFilterByName = moviesNotRented.filter(R => R.titulo.includes(titulo))
        return res.status(200).json(movieFilterByName)
      }

      if (!movies) {
        throw new Error('Não foi possivel encontrar informações!')
      }
      return res.status(200).json(moviesNotRented)
    }
    catch (error) {
      return res.status(500).json(error.message)
    }
  },

  async rent (req, res) {

    const id = await req.params.id
    const idMovie = await Models.Movie.findByPk(id)

    if (!idMovie) {
      return res.status(200).json('Filme não encontrado !!!')
    }
    await Queue.add('rentMovie', { id })
    // setTimeout(async () => {
    return res.status(200).json(idMovie)
    // }, 3000);
  },

  async giveBack (req, res) {
    const id = await req.params.id
    const idMovie = await Models.Movie.findByPk(id)

    if (!idMovie) {
      return res.status(200).json('Filme não encontrado !!!')
    }

    await Queue.add('giveBack', { id })
    // setTimeout(() => {
    return res.status(200).json(idMovie)
    // }, 3000);

  }
}
