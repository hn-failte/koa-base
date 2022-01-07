const log4js = require('log4js')

const date = new Date().toLocaleDateString()

log4js.configure({
  appenders: {
    everything: { type: 'file', filename: `logs/${date}.log` }
  },
  categories: {
    default: { appenders: ['everything'], level: 'info' }
  }
})

const logger = log4js.getLogger() // logger.info()

module.exports = logger
