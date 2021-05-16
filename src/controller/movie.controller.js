const Models = require('../models/index')
const _ = require('lodash')

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

    try {
      const id = await req.params.id
      const videoStore = await Models.VideoStore.findAll({ raw: true })
      let ids = videoStore[0].rented.replace(/[\\"]/g, '').split(',')
      await ids.push(id)
      videoStore[0].rented = await ids.toString()
      const [update] = await Models.VideoStore.update(videoStore[0], {
        where: { id: videoStore[0].id }
      })

      if (update) {
        const videoStoreUpdated = await Models.VideoStore.findByPk(videoStore[0].id)
        return res.status(200).json(videoStoreUpdated)
      }
      throw new Error('Usuário inexistente!')
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  async giveBack (req, res) {
    try {
      const id = await req.params.id
      console.log(id)
      const videoStore = await Models.VideoStore.findAll({ raw: true })
      let ids = videoStore[0].rented.replace(/[\\"]/g, '').split(',')
      ids = _.xor([id], ids)
      videoStore[0].rented = await ids.toString()

      const [update] = await Models.VideoStore.update(videoStore[0], {
        where: { id: videoStore[0].id }
      })

      if (update) {
        const videoStoreUpdated = await Models.VideoStore.findByPk(videoStore[0].id)
        return res.status(200).json(videoStoreUpdated)
      }
      throw new Error('Usuário inexistente!')
    } catch (error) {
      return res.status(500).send({ error: error.message })
    }
  }
}
