import { formatNumber, formatPrice } from '@/utils/orderbook';
import { OrderType } from '@/constants/common';

import DepthVisualizer from '../DepthVisualizer';
import PriceLevelRow from '../PriceLevelRow';
import { PriceLevelRowContainer } from '../styled';

interface IPriceLevel {
  levels: number[][];
  orderType: number;
  isMobile: boolean;
}

export default function PriceLevel({
  levels,
  orderType,
  isMobile,
}: IPriceLevel) {
  const sortedLevelsByPrice: number[][] = [...levels].sort(
    (currentLevel: number[], nextLevel: number[]): number => {
      let result: number = 0;

      if (orderType === OrderType.BIDS || isMobile) {
        result = nextLevel[0] - currentLevel[0];
      } else {
        result = currentLevel[0] - nextLevel[0];
      }

      return result;
    }
  );

  const ROW = sortedLevelsByPrice.map((level, idx) => {
    const calculatedTotal: number = level[2];
    const total: string = formatNumber(calculatedTotal);
    const depth = level[3];
    const size: string = formatNumber(level[1]);
    const price: string = formatPrice(level[0]);

    return (
      // eslint-disable-next-line react/no-array-index-key
      <PriceLevelRowContainer key={idx}>
        <DepthVisualizer
          key={depth}
          depth={depth}
          orderType={orderType}
          isMobile={isMobile}
        />
        <PriceLevelRow
          key={size + total}
          total={total}
          size={size}
          price={price}
          orderType={orderType}
          isMobile={isMobile}
        />
      </PriceLevelRowContainer>
    );
  });

  return <div>{ROW}</div>;
}
