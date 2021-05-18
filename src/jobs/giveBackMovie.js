const Models = require('../models/index')
const _ = require('lodash')

module.exports = {
  key: 'giveBack',
  async handle ({ data }) {
    console.log(data)
    const { id } = data
    await giveBack(id)

  }
}


async function giveBack (idMovie) {
  const videoStore = await Models.VideoStore.findAll({ raw: true })
  let ids = videoStore[0].rented.replace(/[\\"]/g, '').split(',')
  ids = _.xor([idMovie], ids)
  videoStore[0].rented = await ids.toString()

  await Models.VideoStore.update(videoStore[0], {
    where: { id: videoStore[0].id }
  })
}
