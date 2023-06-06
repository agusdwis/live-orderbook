import axios from 'axios';

const BASE_URL: string = 'https://api.binance.com/api/v3/';

const api = axios.create({
  baseURL: BASE_URL,
});

const getSnapshot = async (symbol: string) => {
  return api.get(`/depth?symbol=${symbol}&limit=1000`);
};

export { BASE_URL, getSnapshot };
