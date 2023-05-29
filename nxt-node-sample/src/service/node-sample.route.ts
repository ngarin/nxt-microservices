import { Router } from 'express'

import {
  handleFetch
} from './node-sample.handler'

const router = Router({ mergeParams: true })

router.get(
  '/',
  handleFetch
)

export default router
