module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        parser: 'vue-eslint-parser'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        // 禁止使用 var
        'no-var': 'error',
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        semi: ['error', 'always'], // 不保留分号
        quotes: ['error', 'single'], // 字符串使用单引号
        eqeqeq: ['error', 'smart'],
        'no-undef': 'error',
        'no-template-curly-in-string': 'error',
        'no-unexpected-multiline': 'error',
        'no-unused-vars': 'error',
        'use-isnan': 'error', // 比较nan使用isNan
        properties: 'always', //强制执行驼峰命名约定
        'default-param-last': 'error', //强制默认参数在最后
        ' no-empty': 'error',
        'no-empty-function': 'error',
        'no-implicit-globals': 'error',
        'no-nested-ternary': 'error' //禁止嵌套的三元表达式
    }
};
