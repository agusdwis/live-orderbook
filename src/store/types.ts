export interface WatchlistData {
  product_id: string;
  price: string;
  open_24h: string;
  best_bid: string;
  best_ask: string;
}

interface IWatchlist {
  [key: string]: WatchlistData;
}

export type WatchlistState = {
  cards: string[];
  watchlist: IWatchlist;
};

export type WatchlistAction = {
  // eslint-disable-next-line no-unused-vars
  setWatchlistSingleData: (key: string, data: WatchlistData) => void;
};
