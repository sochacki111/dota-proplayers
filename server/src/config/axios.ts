import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.opendota.com/api/'
});

export default instance;
