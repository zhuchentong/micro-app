const prettierrc = require('./.prettierrc.js')

/**
 * @type {import('prettier').Options}
 */
module.exports = {
  ...prettierrc,
  pugBracketSameLine: 'true',
  pugBracketSpacing: 'true',
  pugSingleQuote: 'true',
}
