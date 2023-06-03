import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { BTC, ETH } from '@/constants/symbol';
import TICKER from '@/constants/channel';

const WSS_FEED_URL: string | undefined = process.env.NEXT_PUBLIC_WSS_FEED_URL;

export default function WatchList() {
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    WSS_FEED_URL as string
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: 'subscribe',
        product_ids: [BTC, ETH],
        channels: [TICKER],
      });
    }
  }, [readyState, sendJsonMessage]);

  useEffect(() => {
    if (lastJsonMessage) {
      const data = lastJsonMessage;
      // eslint-disable-next-line no-console
      console.log('DEBUG::  data', data);
    }
  }, [lastJsonMessage]);

  return <div>WatchList</div>;
}
