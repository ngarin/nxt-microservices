const readline = require('readline-sync')

const { createMicroservice } = require('./create-microservice')

const menu = `
Select an action:

1. Create a microservice

0. Exit
`

;(async () => {
  const choice = readline.question(
    `
  WELCOME TO THE CLI
  ________________________

  ${menu}
`
  )
  try {
    switch (choice) {
      case '1':
        createMicroservice(readline)
        break
    }
  } catch (e) {
    console.error(e)

    process.exit(1)
  }

  process.exit(0)
})()
