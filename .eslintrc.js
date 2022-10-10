module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  extends: [
    // 基础规则引入
    'eslint:recommended',
    // React规则引入
    // 'plugin:react/recommended',
    // prettier规则引入&处理perttier-eslint冲突
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    'jsdoc/newline-after-description': 'off',
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: false,
          ArrowFunctionExpression: false,
          FunctionExpression: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.{js,jsx}'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: false,
        ecmaFeatures: {
          globalReturn: false,
        },
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        // typescript支持引入
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': ['off'],
        'no-prototype-builtins': ['off'],
      },
    },
    {
      files: ['**/*.vue'], // 只处理 vue 文件
      extends: [
        // vue3支持引入
        // 'plugin:vue/vue3-essential',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:vue/vue3-recommended',
        'plugin:vue-pug/vue3-recommended',
        'plugin:prettier-vue/recommended',
        // typescript支持引入
        '@vue/typescript',
      ],
      rules: {
        'vue/multi-word-component-names': ['off'],
        'no-console': ['warn'],
      },
    },
  ],
}
