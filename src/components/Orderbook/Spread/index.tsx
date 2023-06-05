import { formatNumber } from '@/utils/orderbook';
import { SpreadContainer } from '../styled';

interface SpreadProps {
  bids: number[][];
  asks: number[][];
}

const Spread = ({ bids: BIDS, asks: ASKS }: SpreadProps) => {
  const getHighestBid = (bids: number[][]): number => {
    const prices: number[] = bids.map((bid) => bid[0]);
    return Math.max(...prices);
  };

  const getLowestAsk = (asks: number[][]): number => {
    const prices: number[] = asks.map((ask) => ask[0]);
    return Math.min(...prices);
  };

  const getSpreadAmount = (bids: number[][], asks: number[][]): number => {
    if (!bids.length) return 0;

    return Math.abs(getHighestBid(bids) - getLowestAsk(asks));
  };

  const getSpreadPercentage = (spread: number, highestBid: number): string =>
    `(${((spread * 100) / highestBid).toFixed(2)}%)`;

  return (
    <SpreadContainer>
      Ethereum (ETH) Spread: {formatNumber(getSpreadAmount(BIDS, ASKS))}{' '}
      {getSpreadPercentage(getSpreadAmount(BIDS, ASKS), getHighestBid(BIDS))}
    </SpreadContainer>
  );
};

export default Spread;
