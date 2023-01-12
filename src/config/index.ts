const ENV = import.meta.env.MODE || 'production'
const config = {
    development: {
        baseUrl: 'http://localhost:3000',
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
