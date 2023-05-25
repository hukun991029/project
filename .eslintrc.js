module.exports = {
    env: {
        browser: true,
        es2021: true,
        'vue/setup-compiler-macros': true,
        node: true
    },
    parser: 'vue-eslint-parser',
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // 优先使用 interface 而不是 type
        'vue/no-mutating-props': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/require-valid-default-prop': 'off',
        'no-var': 'error', // 禁止使用 var
        semi: ['error', 'never'], // 不保留分号
        quotes: ['error', 'single'], // 字符串使用单引号
        eqeqeq: ['error', 'smart'], //要求使用===和!==
        'no-template-curly-in-string': 'error', //禁止在常规字符串中使用模板文字占位符语法
        'no-unused-vars': 'warn', //禁止未使用的变量
        'use-isnan': 'error', // 比较nan使用isNan
        'default-param-last': 'error', //强制默认参数在最后
        'no-empty': 'error',
        'no-implicit-globals': 'error',
        'no-cond-assign': 'error', //禁止条件表达式中的赋值运算符
        'no-const-assign': 'error', //禁止重新分配const变量
        'no-dupe-args': 'error', //function不允许定义中的重复参数
        'no-nested-ternary': 'error', //禁止嵌套的三元表达式
        'no-duplicate-imports': 'off', //禁止重复模块导入
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-empty-function': 'off',
        'no-debugger': 'off',
        'no-prototype-builtins': 'off'
    }
}
