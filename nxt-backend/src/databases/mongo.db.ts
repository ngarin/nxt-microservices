import mongoose from 'mongoose'

import logger from '../helpers/logger.helper'

export function mongodbConnect() {
  const { MONGO_PROTOCOL, MONGO_HOST, MONGO_USER, MONGO_DB, MONGO_PWD, MONGO_AUTH_SOURCE } = process.env

  const MONGO_URI = `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}/${MONGO_DB}?authSource=${MONGO_AUTH_SOURCE}`

  logger.info('MONGOOSE --> launch connect mongo')

  if (process.env.NODE_ENV === 'development') {
    logger.info('MONGOOSE --> mongoose launch in debug mode')

    mongoose.set('debug', true)
  }

  mongoose.connection.on('connected', () => {
    logger.info('MONGO --> Connection Established')
  })

  mongoose.connection.on('reconnected', () => {
    logger.info('MONGOOSE --> Connection Reestablished')
  })

  mongoose.connection.on('disconnected', () => {
    logger.info('MONGOOSE --> Connection Disconnected')
  })

  mongoose.connection.on('close', () => {
    logger.info('MONGOOSE --> Connection Closed')
  })

  mongoose.connection.on('error', error => {
    logger.error(`MONGOOSE --> ERROR: ${error}`)
  })

  return mongoose.connect(MONGO_URI)
}
