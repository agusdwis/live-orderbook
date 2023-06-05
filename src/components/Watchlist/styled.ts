import styled, { css, keyframes } from 'styled-components';

const GREEN = '#00ab6b';
const RED = '#ee4a49';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Flex)`
  gap: 20px;
  border: 1px solid #ededed;
  border-radius: 8px;
  padding: 20px;
`;

const CardWrapper = styled(Flex)`
  gap: 20px;
`;

const Card = styled(Flex)`
  border: 1px solid #ededed;
  padding: 10px;
  border-radius: 8px;
  justify-content: space-between;
  gap: 10px;
  height: 90px;
`;

const CardHeader = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardFooter = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;

  span {
    font-weight: 600;
    color: #00ab6b;
  }

  & div div:first-child span {
    color: #ee4a49;
  }
`;

const StockName = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: bold;
  font-size: 18px;
`;

interface IPrice {
  change?: string;
}

const UpAnimation = keyframes`
  0% {
    color: #00AB6B;
  }
  40% {
    color: #00AB6B;
  }
  100% {
    color: unset;
  }
`;

const DownAnimation = keyframes`
  0% {
    color: #EE4A49;
  }
  40% {
    color: #EE4A49;
  }
  100% {
    color: unset;
  }
`;

const StockPrice = styled.p<IPrice>`
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: 14px;
  color: #000;

  ${({ change }) => {
    let animation;

    if (change === 'down') animation = DownAnimation;
    if (change === 'up') animation = UpAnimation;

    return css`
      animation: ${animation} 3s linear forwards;
    `;
  }}
`;

const FooterBidAsk = styled(Flex)`
  gap: 3px;
`;

const FooterPercent = styled(Flex)<IPrice>`
  font-weight: 800;
  font-size: 15px;

  ${({ change }) => {
    let color;

    if (change === 'down') color = RED;
    if (change === 'up') color = GREEN;

    return css`
      color: ${color};
    `;
  }}
`;

const Skeleton = styled(Card)`
  background: #f7f7f7;
  border: none;
`;

export {
  Container,
  CardWrapper,
  Card,
  CardHeader,
  CardFooter,
  StockName,
  StockPrice,
  FooterBidAsk,
  FooterPercent,
  Skeleton,
};
