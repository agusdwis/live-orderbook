import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

import useStore from '@/store/useOrderbook';

import PriceLevel from './PriceLevel';
import TitleRow from './TitleRow';
import Spread from './Spread';
import Skeleton from './Skeleton';
import { Container, PriceWrapper, PriceSection } from './styled';

const WSS_FEED_URL: string | undefined =
  process.env.NEXT_PUBLIC_WSS_ORDERBOOK_URL;

const PRODUCT = 'PI_ETHUSD';

const OrderType = {
  BIDS: 0,
  ASKS: 1,
};

interface Delta {
  bids: number[][];
  asks: number[][];
}

interface IWatchlist {
  isActive?: boolean;
  isMobile: boolean;
}

let currentBids: number[][] = [];
let currentAsks: number[][] = [];

export default function OrderBook({ isActive = true, isMobile }: IWatchlist) {
  const { sendJsonMessage, getWebSocket } = useWebSocket(
    WSS_FEED_URL as string,
    {
      shouldReconnect: () => true,
      onMessage: (event: WebSocketEventMap['message']) =>
        processMessages(event),
    }
  );

  const store = useStore();

  useEffect(() => {
    function connect() {
      const unSubscribeMessage = {
        event: 'unsubscribe',
        feed: 'book_ui_1',
        product_ids: [PRODUCT],
      };
      sendJsonMessage(unSubscribeMessage);

      const subscribeMessage = {
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: [PRODUCT],
      };
      sendJsonMessage(subscribeMessage);
    }

    if (!isActive) getWebSocket()?.close();

    connect();
  }, [isActive, sendJsonMessage, getWebSocket]);

  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data);

    if (response.numLevels) {
      store.setOrderbookSnapshot(response);
    } else {
      process(response);
    }
  };

  const process = (data: Delta) => {
    if (data?.bids?.length > 0) {
      currentBids = [...currentBids, ...data.bids];
      // console.log('DEBUG::  currentBids', currentBids);

      if (currentBids.length > 25) {
        store.setAddBids(currentBids);
        currentBids = [];
        currentBids.length = 0;
      }
    }
    if (data?.asks?.length >= 0) {
      currentAsks = [...currentAsks, ...data.asks];
      // console.log('DEBUG::  currentAsks', currentAsks);

      if (currentAsks.length > 25) {
        store.setAddAsks(currentAsks);
        currentAsks = [];
        currentAsks.length = 0;
      }
    }
  };

  return (
    <Container>
      <div style={{ fontWeight: 'bold' }}>Order Book</div>

      <Spread bids={store.bids} asks={store.asks} />

      {!store.bids.length || !store.asks.length ? (
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
