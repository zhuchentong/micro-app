module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
    'stylelint-config-recommended-vue',
    // SCSS样式方案
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
  ],
}
