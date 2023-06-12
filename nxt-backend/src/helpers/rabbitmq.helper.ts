import * as amqp from 'amqplib'

import { appConfig } from 'config/app.config'

class RabbitMQHelper {
  private connection: amqp.Connection

  public async createChannel(): Promise<amqp.Channel> {
    await this.connect()

    return this.connection.createChannel()
  }

  public async sendToQueue(queue: string, msg: any, channel: amqp.Channel) {
    await channel.assertQueue(queue)

    channel.sendToQueue(queue, Buffer.from(msg))
  }

  public consume(
    queue: string,
    channel: amqp.Channel,
    callback: (msg: amqp.Message) => void
  ) {
    channel.consume(queue, callback)
  }

  private async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await amqp.connect(appConfig.rabbitMQ.url)
    }
  }
}

export default new RabbitMQHelper()
