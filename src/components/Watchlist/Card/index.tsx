import { memo, useRef, useEffect } from 'react';

import {
  getPriceChangeStatus,
  formatPrice,
  calcPercentChange,
} from '@/utils/watchlist';

import {
  Card,
  CardHeader,
  CardFooter,
  StockName,
  StockPrice,
  FooterBidAsk,
  FooterPercent,
} from '../styled';

interface IWatchlistCard {
  name: string;
  openPrice: string;
  price: string;
  bid: string;
  ask: string;
}

function WatchlistCard({ name, openPrice, price, bid, ask }: IWatchlistCard) {
  const prevPriceRef = useRef(price);

  useEffect(() => {
    prevPriceRef.current = price;
  }, [price]);

  const priceDiffStatus = getPriceChangeStatus(prevPriceRef.current, price);
  const dayChanges = calcPercentChange(openPrice, price);
  const dayChangesDiffStatus = getPriceChangeStatus(openPrice, price);

  return (
    <Card>
      <CardHeader>
        <StockName>{name}</StockName>
        <StockPrice change={priceDiffStatus}>${formatPrice(price)}</StockPrice>
      </CardHeader>

      <CardFooter>
        <FooterBidAsk>
          <div>
            <span>Bid:</span> {formatPrice(bid)}
          </div>
          <div>
            <span>Ask:</span> {formatPrice(ask)}
          </div>
        </FooterBidAsk>

        <FooterPercent change={dayChangesDiffStatus}>
          {dayChanges}
        </FooterPercent>
      </CardFooter>
    </Card>
  );
}

export default memo(WatchlistCard);
