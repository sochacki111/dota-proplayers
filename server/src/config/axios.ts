import axios from 'axios';

const instance = axios.create({
  // TODO Fix process.env.OPEN_DOTA_BASE_URL undefined?
  // baseURL: process.env.OPEN_DOTA_BASE_URL
  baseURL: 'https://api.opendota.com/api/'
});

export default instance;
