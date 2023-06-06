/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';

import useStore from '@/store/useOrderbook';
import { OrderType } from '@/constants/common';
import { convertArrayToNumber } from '@/utils/orderbook';

import PriceLevel from './PriceLevel';
import TitleRow from './TitleRow';
import Spread from './Spread';
import Skeleton from './Skeleton';
import { Container, PriceWrapper, PriceSection } from './styled';

const SYMBOL = 'ethusdt';
const BASE_WSS_URL: string | undefined =
  process.env.NEXT_PUBLIC_WSS_BINANCE_URL;

interface Delta {
  bids: string[][];
  asks: string[][];
}

interface IWatchlist {
  isActive?: boolean;
  isMobile: boolean;
}
interface IData {
  u: number;
  U: number;
  a: string[][];
  b: string[][];
  lastUpdateId: number;
}

interface IDataStream {
  bids: string[][];
  asks: string[][];
  lastUpdateId: number;
}

let currentBids: number[][] = [];
let currentAsks: number[][] = [];

export default function OrderBook({ isActive = true, isMobile }: IWatchlist) {
  const WSS_URL: string = `${BASE_WSS_URL}/ws/${SYMBOL}@depth20@100ms`;
  const {
    lastJsonMessage: dataJSON,
    sendJsonMessage,
    getWebSocket,
  } = useWebSocket(WSS_URL, {
    shouldReconnect: () => true,
  });

  const store = useStore();
  const isFirstRender = useRef(true);

  useEffect(() => {
    store.getSnapshot(SYMBOL.toUpperCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function connect() {
      const unSubscribeMessage = {
        method: 'UNSUBSCRIBE',
        params: [`${SYMBOL}@depth`],
        id: 1,
      };
      sendJsonMessage(unSubscribeMessage);

      const subscribeMessage = {
        method: 'SUBSCRIBE',
        params: [`${SYMBOL}@depth`],
        id: 1,
      };
      sendJsonMessage(subscribeMessage);
    }

    if (!isActive) getWebSocket()?.close();

    connect();
  }, [isActive, sendJsonMessage, getWebSocket]);

  useEffect(() => {
    depthCalculation();
    // streamCalculation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataJSON]);

  const process = (data: Delta) => {
    if (data?.bids?.length) {
      currentBids = [...currentBids, ...convertArrayToNumber(data.bids)];

      if (currentBids.length > 25) {
        store.setAddBids(currentBids);
        currentBids = [];
        currentBids.length = 0;
      }
    }

    if (data?.asks?.length) {
      currentAsks = [...currentAsks, ...convertArrayToNumber(data.asks)];

      if (currentAsks.length > 25) {
        store.setAddAsks(currentAsks);
        currentAsks = [];
        currentAsks.length = 0;
      }
    }
  };

  const depthCalculation = () => {
    // @ts-ignore
    const data: IDataStream = dataJSON;

    if (data) {
      if (data.lastUpdateId <= store.lastUpdateId) return;

      const payload = {
        bids: data.bids,
        asks: data.asks,
        lastUpdateId: data.lastUpdateId,
      };

      process(payload);
    }
  };

  const streamCalculation = () => {
    // @ts-ignore
    const data: IData = dataJSON;

    if (data) {
      if (data.u <= store.lastUpdateId) return;

      const payload = {
        bids: data.b,
        asks: data.a,
        lastUpdateId: data.u,
      };

      process(payload);
    }
  };

  const BID_LENGTH = store.bids.length;
  const ASK_LENGTH = store.asks.length;

  return (
    <Container>
      <div style={{ fontWeight: 'bold' }}>Order Book</div>

      <Spread bids={store.bids} asks={store.asks} />

      {!BID_LENGTH || !ASK_LENGTH ? (
        <Skeleton />
      ) : (
        <PriceWrapper isMobile={isMobile}>
          <PriceSection>
            {!isMobile && <TitleRow reversedFieldsOrder />}
            <PriceLevel
              levels={store.bids}
              orderType={OrderType.BIDS}
              isMobile={isMobile}
            />
          </PriceSection>

          <PriceSection>
            <TitleRow />
            <PriceLevel
              levels={store.asks}
              orderType={OrderType.ASKS}
              isMobile={isMobile}
            />
          </PriceSection>
        </PriceWrapper>
      )}
    </Container>
  );
}
