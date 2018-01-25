import axios from 'axios';

const isDev   = process.env.NODE_ENV === 'development';
const devUrl  = 'http://localhost:3000';
const prodUrl = 'http://localhost:3000';
const APIurl  = isDev ? devUrl : prodUrl;

export default () => axios.create({ baseURL: APIurl });
