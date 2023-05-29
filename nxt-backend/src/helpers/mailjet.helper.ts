import Mailjet from 'node-mailjet'

class MailjetHelper {
  private mailjet = new Mailjet({
    apiKey: process.env.MAILJET_APIKEY_PUBLIC || 'your-api-key',
    apiSecret: process.env.MAILJET_APIKEY_PRIVATE || 'your-api-secret'
  })
  public sendMail(from: IMailUser, to: IMailUser[], subject: string, variables: any, templateID: number) {
    return this.mailjet.post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: from,
            To: to,
            Subject: subject,
            Variables: variables,
            TemplateID: templateID,
            TemplateLanguage: true,
            TemplateErrorReporting: {
              Email: 'my-email@example.com',
              Name: 'Nxt'
            }
          }
        ]
      })
  }
}

export interface IMailUser {
  email: string
  name: string
}

export default new MailjetHelper()
