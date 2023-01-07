import Request from './request';
const http = new Request({
    baseURL: import.meta.env.VITE_APP_BASE_URL as string,
    timeout: 1000 * 60 * 5
});
export default http;
