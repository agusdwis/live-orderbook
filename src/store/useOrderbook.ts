/* eslint-disable no-console */
import { create } from 'zustand';
import produce from 'immer';

import {
  addTotalSums,
  groupByTicketSize,
  getMaxTotalSum,
  addDepths,
  applyDeltas,
  convertArrayToNumber,
} from '@/utils/orderbook';
import { getSnapshot } from '@/lib/orderbook';

import { OrderbookState, OrderbookAction } from './types';

const initialState: OrderbookState = {
  market: '',
  rawBids: [],
  bids: [],
  maxTotalBids: 0,
  rawAsks: [],
  asks: [],
  maxTotalAsks: 0,
  groupingSize: 1,
  lastUpdateId: 0,
};

type OrderbookStore = typeof initialState & OrderbookAction;

const useOrderbookStore = create<OrderbookStore>((set, get) => ({
  ...initialState,
  setOrderbookSnapshot: (payload: any) => {
    const groupSize = get().groupingSize;

    const rawBids: number[][] = convertArrayToNumber(payload.bids);
    const rawAsks: number[][] = convertArrayToNumber(payload.asks);

    const groupedBids: number[][] = groupByTicketSize(rawBids, groupSize);
    const groupedAsks: number[][] = groupByTicketSize(rawAsks, groupSize);

    const bids: number[][] = addTotalSums(groupedBids);
    const asks: number[][] = addTotalSums(groupedAsks);

    set(
      produce((state: OrderbookState) => {
        state.market = payload.product_id ?? '';
        state.rawBids = rawBids;
        state.rawAsks = rawAsks;
        state.maxTotalBids = getMaxTotalSum(bids);
        state.maxTotalAsks = getMaxTotalSum(asks);
        state.bids = addDepths(bids, getMaxTotalSum(bids));
        state.asks = addDepths(asks, getMaxTotalSum(asks));
      })
    );
  },
  setAddBids: (payload: any) => {
    const currentTicketSize: number = get().groupingSize;
    const groupedCurrentBids: number[][] = groupByTicketSize(
      payload,
      currentTicketSize
    );
    const updatedBids: number[][] = addTotalSums(
      applyDeltas(
        groupByTicketSize(get().rawBids, currentTicketSize),
        groupedCurrentBids
      )
    );

    set(
      produce((state: OrderbookState) => {
        state.maxTotalBids = getMaxTotalSum(updatedBids);
        state.bids = addDepths(updatedBids, get().maxTotalBids);
      })
    );
  },
  setAddAsks: (payload: any) => {
    const currentTicketSize: number = get().groupingSize;
    const groupedCurrentAsks: number[][] = groupByTicketSize(
      payload,
      currentTicketSize
    );
    const updatedAsks: number[][] = addTotalSums(
      applyDeltas(
        groupByTicketSize(get().rawAsks, currentTicketSize),
        groupedCurrentAsks
      )
    );

    set(
      produce((state: OrderbookState) => {
        state.maxTotalAsks = getMaxTotalSum(updatedAsks);
        state.asks = addDepths(updatedAsks, get().maxTotalAsks);
      })
    );
  },
  getSnapshot: async (symbol: string) => {
    try {
      const { data } = await getSnapshot(symbol);

      if (!data) {
        throw Error('Failed to fetch snapshot');
      }

      get().setOrderbookSnapshot(data);

      set(
        produce((state: OrderbookState) => {
          state.market = symbol;
          state.lastUpdateId = data.lastUpdateId ?? 0;
        })
      );
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useOrderbookStore;
