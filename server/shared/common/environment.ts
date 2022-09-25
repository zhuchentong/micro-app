export function isDevEnv() {
  const environment = process.env['NODE_ENV'] || 'development'
  return ['development'].includes(environment)
}
