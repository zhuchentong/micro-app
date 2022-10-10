const fs = require('fs')
const path = require('path')

const TYPE_FILE_DIR = './src/types'

const checkTypeScript = () => {
  const typeFiles = fs
    .readdirSync(path.resolve(TYPE_FILE_DIR))
    .map((file) => `${TYPE_FILE_DIR}/${file}`)

  return (filenames) => {
    const files = [...filenames, ...typeFiles]
    return `tsc-files ${files.join(' ')} --noEmit --esModuleInterop`
  }
}

module.exports = {
  '**/*.{ts,tsx}': [
    checkTypeScript(),
    'eslint --cache --fix --max-warnings=0',
    'prettier --config ./.prettierrc-cli.js --write',
  ],
  '**/*.{js,jsx}': [
    'eslint --cache --fix --max-warnings=0 ',
    'prettier --config ./.prettierrc-cli.js --write',
  ],
  '**/*.vue': [
    'eslint --cache --fix --max-warnings=0',
    'prettier --config ./.prettierrc-cli.js --write',
  ],
  '**/*.{css,less,scss}': ['stylelint --cache --fix'],
}
