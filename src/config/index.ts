<<<<<<< HEAD
const ENV = import.meta.env.MODE || 'production'
const config = {
    development: {
        baseUrl: '/api',
        mockUrl: 'https://www.fastmock.site/mock/90588b8c15b0d8765170506d61d4f183/api'
    },
    test: {
        baseUrl: '',
        mockUrl: 'https://www.fastmock.site/mock/90588b8c15b0d8765170506d61d4f183/api'
    },
    prod: {
        baseUrl: '',
        mockUrl: 'https://www.fastmock.site/mock/90588b8c15b0d8765170506d61d4f183/api'
    }
}
export default {
    ENV,
    mock: false,
    ...config[ENV]
}
=======
const ENV = import.meta.env.MODE || 'production'
const config = {
    development: {
        baseUrl: '/api',
        mockUrl: 'https://www.fastmock.site/mock/90588b8c15b0d8765170506d61d4f183/api'
    },
    test: {
        baseUrl: '',
        mockUrl: 'https://www.fastmock.site/mock/90588b8c15b0d8765170506d61d4f183/api'
    },
    prod: {
        baseUrl: '',
        mockUrl: 'https://www.fastmock.site/mock/90588b8c15b0d8765170506d61d4f183/api'
    }
}
export default {
    ENV,
    mock: false,
    ...config[ENV]
}
>>>>>>> 30c74984755579054e12ae60b5c16d49c56aa6eb
