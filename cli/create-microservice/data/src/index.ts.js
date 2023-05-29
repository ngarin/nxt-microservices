const fileContent = `import 'module-alias/register'
import { Router } from 'express'
import * as dotenv from 'dotenv'

import { launchServer } from 'nxt-backend/dist/index'

import {{serviceNameCamel}}Router from '@service/{{serviceName}}.route'

dotenv.config()

const router = Router({ mergeParams: true })

router.use('/:lang', {{serviceNameCamel}}Router)

launchServer(router, {{port}})
`

module.exports = { fileContent }
