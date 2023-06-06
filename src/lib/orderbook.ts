import axios from 'axios';

const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BINANCE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

const getSnapshot = async (symbol: string) => {
  return api.get(`/depth?symbol=${symbol}&limit=1000`);
};

export { BASE_URL, getSnapshot };
