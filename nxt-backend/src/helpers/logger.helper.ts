import { createLogger, transports, format } from 'winston'
import { consoleFormat } from 'winston-console-format'

const logger = createLogger({
  level: 'info',
  format: format.json(),
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.simple(),
        format.colorize({ all: true }),
        consoleFormat({
          showMeta: true,
          metaStrip: ['service'],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
          },
        })
      ),
    })
  )
}

export default logger
