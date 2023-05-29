import 'module-alias/register'
import { Router } from 'express'
import * as dotenv from 'dotenv'

import { launchServer } from 'nxt-backend/dist/index'

import userRouter from '@service/node-sample.route'

dotenv.config()

const router = Router({ mergeParams: true })

router.use('/:lang', userRouter)

launchServer(router, 8080)
