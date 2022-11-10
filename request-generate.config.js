module.exports = {
  gateway: 'https://gateway.ihis.xbt-dev.top/',
  openapi: '/v3/api-docs',
  output: './src/http',
  exportModels: true,
  applications: {
    'user-service': 'platform-user-service',
  },
  logger: true,
  exportServices: {
    serviceResolve({ object, tags }) {
      // const tag =   object.tags
      const tag = tags.find((tag) => tag.name === object.tags?.[0])

      if (tag && tag.description) {
        return tag.description.replace(/\s/g, '').replace(/Controller$/g, '')
      } else {
        return 'default'
      }
    },
    operationResolve({ object }) {
      return object.operationId.replace(/Using(GET|POST|PATCH|DELETE)/g, '')
    },
    responseType: 'promise',
    excludeQueryParams: ['page', 'size', 'order', 'sort', 'paged', 'unpaged'],
  },
}
