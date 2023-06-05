import { create } from 'zustand';
import produce from 'immer';

import {
  addTotalSums,
  groupByTicketSize,
  getMaxTotalSum,
  addDepths,
  applyDeltas,
} from '@/utils/orderbook';

import { OrderbookState, OrderbookAction } from './types';

const initialState: OrderbookState = {
  market: '',
  rawBids: [],
  bids: [],
  maxTotalBids: 0,
  rawAsks: [],
  asks: [],
  maxTotalAsks: 0,
  groupingSize: 0.05,
};

type OrderbookStore = typeof initialState & OrderbookAction;

const useOrderbookStore = create<OrderbookStore>((set, get) => ({
  ...initialState,
  setOrderbookSnapshot: (payload: any) => {
    const rawBids: number[][] = payload.bids;
    const rawAsks: number[][] = payload.asks;
    const bids: number[][] = addTotalSums(
      groupByTicketSize(rawBids, get().groupingSize)
    );
    const asks: number[][] = addTotalSums(
      groupByTicketSize(rawAsks, get().groupingSize)
    );

    set(
      produce((state: OrderbookState) => {
        state.market = payload.product_id;
        state.rawBids = rawBids;
        state.rawAsks = rawAsks;
        state.maxTotalBids = getMaxTotalSum(bids);
        state.maxTotalAsks = getMaxTotalSum(asks);
        state.bids = addDepths(bids, get().maxTotalBids);
        state.asks = addDepths(asks, get().maxTotalAsks);
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
        state.asks = addDepths(updatedAsks, get().maxTotalBids);
      })
    );
  },
}));

export default useOrderbookStore;
