const fileContent = `import { Router } from 'express'

import { handleHelloWorld{{serviceNameUpperCamel}} } from './{{serviceName}}.handler'

const router = Router({ mergeParams: true })

router.get('/', handleHelloWorld{{serviceNameUpperCamel}})

export default router
`

module.exports = { fileContent }
