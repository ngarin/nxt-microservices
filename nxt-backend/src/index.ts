import sourceMapSupport from 'source-map-support'
import express from 'express'
import { createServer } from 'http'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { EHttpStatusCodes } from 'nxt-shared/dist/enums/http-status-codes.enum'

import { handleError } from './helpers/error-handler.helper'
import logger from './helpers/logger.helper'
import { mongodbConnect } from './databases/mongo.db'

dotenv.config()
sourceMapSupport.install()

const app = express()

let whitelist = [
  'https://www.winningbrothers.com',
  'https://dev-admin.winningbrothers.localhost',
  'https://dev-www.winningbrothers.localhost',
  'https://stag-admin.winningbrothers.com',
  'https://stag-www.winningbrothers.com',
  'http://localhost:4200',
  'http://localhost:4201',
  'http://127.0.0.1:4201'
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    optionsSuccessStatus: 200
  })
)

app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('[:date[clf]]: :method :url :status :response-time ms - :res[content-length]'))

export async function launchServer(
  router: express.Router,
  port: number,
  hasSocket = false,
  handleSocket?: (socket) => void
) {
  try {
    await mongodbConnect()

    let http
    let io

    if (hasSocket) {
      http = createServer(app)
      io = require('socket.io')(http)

      app.use((req, res, next) => {
        req['io'] = io
        next()
      })
    }

    app.use(router)

    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(EHttpStatusCodes.notFound).send({
        details: "This entity dosen't exists or has been deleted",
        status: EHttpStatusCodes.notFound,
        title: 'Not Found'
      })
    })

    app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
      handleError(err, res)
    })

    if (!hasSocket) {
      app.listen(port, () => {
        logger.info(`Listening to http://localhost:${port} 🚀`)
      })
    } else {
      io.on('connection', socket => {
        handleSocket(socket)
      })

      http.listen(port, () => {
        logger.info(`Listening to http://localhost:${port} 🚀`)
      })
    }
  } catch (error) {
    logger.error(error)

    app.emit('error', error)
  }
}
