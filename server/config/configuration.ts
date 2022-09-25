export default () => ({
  app: {
    name: process.env['APP_NAME'],
    port: process.env['APP_PORT'],
  },
  nacos: {
    host: process.env['NACOS_HOST'],
    port: process.env['NACOS_PORT'],
    group: process.env['NACOS_GROUP'],
    prefix: process.env['NACOS_PREFIX'],
    namespace: process.env['NACOS_NAMESPACE'],
    username: process.env['NACOS_USERNAME'],
    password: process.env['NACOS_PASSWORD'],
    protocol: process.env['NACOS_PROTOCOL'],
  },
})
