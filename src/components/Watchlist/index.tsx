import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

import TICKER from '@/constants/channel';
import useStore from '@/store/useWatchlist';
import { BTC, ETH, SOL, ADA, DOT, MATIC } from '@/constants/symbol';
import { WatchlistData } from '@/store/types';
import { getCryptoKey } from '@/utils/watchlist';

import Card from './Card';
import Skeleton from './Skeleton';
import { Container, CardWrapper } from './styled';

const WSS_FEED_URL: string | undefined = process.env.NEXT_PUBLIC_WSS_FEED_URL;
const productsIDs = [BTC, ETH, SOL, ADA, DOT, MATIC];

interface IWatchlist {
  isActive: boolean;
}

export default function WatchList({ isActive }: IWatchlist) {
  const [crypto, setCrypto] = useState(productsIDs);

  const { sendJsonMessage, lastJsonMessage, getWebSocket } = useWebSocket(
    WSS_FEED_URL as string,
    {
      shouldReconnect: () => true,
    }
  );

  const { watchlist, setWatchlistSingleData } = useStore();

  useEffect(() => {
    setCrypto(productsIDs);
  }, []);

  useEffect(() => {
    function connect() {
      const unSubscribeMessage = {
        type: 'unsubscribe',
        product_ids: crypto,
        channels: [TICKER],
      };
      sendJsonMessage(unSubscribeMessage);

      const subscribeMessage = {
        type: 'subscribe',
        product_ids: crypto,
        channels: [TICKER],
      };
      sendJsonMessage(subscribeMessage);
    }

    if (!isActive) getWebSocket()?.close();

    connect();
  }, [isActive, crypto, sendJsonMessage, getWebSocket]);

  useEffect(() => {
    if (lastJsonMessage) {
      // @ts-ignore
      const { product_id, price, open_24h, best_bid, best_ask } =
        lastJsonMessage;

      const storedValue = {
        product_id,
        price,
        open_24h,
        best_bid,
        best_ask,
      };

      const KEY = getCryptoKey(product_id);

      if (KEY) {
        setWatchlistSingleData(KEY, storedValue);
      }
    }
  }, [lastJsonMessage, setWatchlistSingleData]);

  return (
    <Container>
      <div style={{ fontWeight: 'bold' }}>Watchlist</div>

      {!Object.keys(watchlist).length ? (
        <Skeleton />
      ) : (
        <CardWrapper>
          {Object.keys(watchlist).map((item) => {
            const {
              product_id,
              price,
              open_24h,
              best_bid,
              best_ask,
            }: WatchlistData = watchlist[item];
            return (
              <div key={product_id}>
                <Card
                  name={product_id}
                  openPrice={open_24h}
                  price={price}
                  bid={best_bid}
                  ask={best_ask}
                />
              </div>
            );
          })}
        </CardWrapper>
      )}
    </Container>
  );
}
