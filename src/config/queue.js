const redisConfig = require('./redis')
const Queue = require('bull/lib/queue')

const Jobs = require('../jobs/index')

const queues = Object.values(Jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
}))

module.exports = {
  queues,
  add (name, data) {
    const queue = this.queues.find(queue => queue.name === name)

    return queue.bull.add(data);
  },

  process () {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle)
    })
  }
}
