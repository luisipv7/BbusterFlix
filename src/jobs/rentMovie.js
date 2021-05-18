const Models = require('../models/index')
const _ = require('lodash')

module.exports = {
  key: 'rentMovie',
  async handle ({ data }) {
    console.log(data)
    const { id } = data
    await rentMovie(id)

  }
}


async function rentMovie (idMovie) {
  try {
    console.log(idMovie)
    const videoStore = await Models.VideoStore.findAll({ raw: true })
    let ids = videoStore[0].rented.replace(/[\\"]/g, '').split(',')
    await ids.push(idMovie)
    videoStore[0].rented = await ids.toString()
    await Models.VideoStore.update(videoStore[0], {
      where: { id: videoStore[0].id }
    })
    console.log(videoStore[0].rented)
  } catch (error) {
    return error.message
  }
}
