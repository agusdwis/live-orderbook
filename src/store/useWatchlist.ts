import { create } from 'zustand';
import produce from 'immer';

import { WatchlistState, WatchlistData, WatchlistAction } from './types';

const initialState: WatchlistState = {
  cards: [],
  watchlist: {},
};

type WatchlistStore = WatchlistState & WatchlistAction;

const useWatchlistStore = create<WatchlistStore>((set) => ({
  ...initialState,
  setWatchlistSingleData: (key: string, data: WatchlistData) => {
    set(
      produce((state: WatchlistState) => {
        state.watchlist[key] = data;
      })
    );
  },
}));

export default useWatchlistStore;
