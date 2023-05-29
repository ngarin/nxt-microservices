class UtilsHelper {
  public base64decode(data: string, encoding = 'utf-8') {
    const buff = Buffer.from(data, 'base64')
    return buff.toString()
  }

  public base64encode(data: string) {
    const buff = Buffer.from(data)
    return buff.toString('base64')
  }

  public generateUID(): string {
    const codeS4 = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
    const dateCode = new Date().getTime()
    return `${dateCode}_${codeS4}`
  }
}

export default new UtilsHelper()
