/* eslint-disable no-unused-vars */
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
  setWatchlistSingleData: (key: string, data: WatchlistData) => void;
};

export interface OrderbookState {
  market: string;
  rawBids: number[][];
  bids: number[][];
  maxTotalBids: number;
  rawAsks: number[][];
  asks: number[][];
  maxTotalAsks: number;
  groupingSize: number;
}

export type OrderbookAction = {
  setOrderbookSnapshot: (payload: any) => void;
  setAddBids: (payload: any) => void;
  setAddAsks: (payload: any) => void;
};
