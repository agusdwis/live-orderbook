import { BTC } from './symbol';

const initialWatchlistState = {
  btc: {
    product_id: BTC,
    price: '0',
    open_24h: '0',
    best_bid: '0',
    best_ask: '0',
  },
};

// eslint-disable-next-line import/prefer-default-export
export { initialWatchlistState };
