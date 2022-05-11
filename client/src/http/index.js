import axios from "axios";
const param = require('./config.json');

const $host = axios.create(
    {
        baseURL: param.REACT_APP_API_URL
    });

const $authHost = axios.create(
    {
        baseURL: param.REACT_APP_API_URL
    });

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}