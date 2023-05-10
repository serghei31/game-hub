import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: 'c99959d4032d4a16b07115599e156bc7',
  },
});
