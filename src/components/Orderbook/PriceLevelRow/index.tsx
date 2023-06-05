import { PriceLevelContainer as Container } from '../styled';

interface PriceLevelRowProps {
  total: string;
  size: string;
  price: string;
  orderType: number;
  isMobile: boolean;
}

const PriceLevelRow = ({
  total,
  size,
  price,
  orderType,
  isMobile,
}: PriceLevelRowProps) => {
  return (
    <Container isBid={orderType === 0} isMobile={isMobile}>
      <span className="price">{price}</span>
      <span>{size}</span>
      <span>{total}</span>
    </Container>
  );
};

export default PriceLevelRow;
