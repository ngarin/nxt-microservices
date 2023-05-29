export const appConfig = {
  webappUrl: {
    protocol: 'https',
    host: 'dev-www.winningbrothers.localhost'
  },
  streamUrl: {
    protocol: 'http',
    host: 'wb-stream:8084'
  },
  socketUrl: {
    protocol: 'http',
    host: 'wb-socket:8089'
  },
  userUrl: {
    protocol: 'http',
    host: 'wb-user:8080'
  },
  notificationUrl: {
    protocol: 'http',
    host: 'wb-notification:8090'
  },
  transactionUrl: {
    protocol: 'http',
    host: 'wb-transaction:8087'
  },
  brotherUrl: {
    protocol: 'http',
    host: 'wb-brother:8095'
  },
  followUrl: {
    protocol: 'http',
    host: 'wb-follow:8094'
  },
  versusUrl: {
    protocol: 'http',
    host: 'wb-versus:8088'
  },
  versusTimerUrl: {
    protocol: 'http',
    host: 'wb-versus-timer:8096'
  },
  vapid: {
    publicKey: 'BGF_UOvyFy37V9_-UqoCr0nZeawioAkFcoF-w0lsUVJM5boitSq7WH9FB-bkgEO3LLQsn4QwIH1IgSgVqtzzvwI',
    privateKey: 'ClhYI9AH6O1jnJoI0B3Zu9lM6RrspJlbCZhMcQq2Q_c'
  },
  stripe: {
    publicKey: 'pk_test_Tf7ygjQQbt8ciJ4NLaVPNitA00cD888a8s',
    secreteKey:
      'sk_test_51GYb3qFrFcgyRVBvdttnTwHqcOmunxfrCWvWN125po80ZsPw5HnfS9ZJXJbEaAw7s4nKrlsKyWtKmuzRniiSxrVv00Uy1fcDqj'
  },
  paypal: {
    url: 'https://api-m.sandbox.paypal.com',
  }
}
