/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';

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

interface IPWrapper {
  isMobile: boolean;
}

const PriceWrapper = styled(Flex)<IPWrapper>`
  flex-direction: ${({ isMobile }) => (isMobile ? 'column-reverse' : 'row')};
`;

const PriceSection = styled.div`
  margin: 0;
  flex: 1;
`;

const PriceLevelRowContainer = styled.div`
  margin: 0;
  position: relative;
`;

interface ContainerProps {
  isBid?: boolean;
  isMobile: boolean;
}

const PriceLevelContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${({ isBid, isMobile }) =>
    isBid && !isMobile ? 'row-reverse' : 'row'};
  justify-content: space-around;
  gap: 20px;

  &:after {
    background-color: ${({ isBid }) => (isBid ? '#113534' : '#3d1e28')};
    background-position: center;
    height: 100%;
    padding: 0.3em 0;
    display: block;
    content: '';
    position: absolute;
    left: 0;
    right: unset;
    z-index: 0;
  }

  span {
    z-index: 2;
    min-width: 70px;
    color: ${({ isBid }) => (isBid ? '#00ab6b' : '#ee4a49')};
  }

  .price {
    font-weight: 500;
  }
`;

const SpreadContainer = styled.div`
  color: #ffffff;
  font-weight: bold;
  background-color: #00ab6b;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  border-radius: 4px;
  margin-bottom: -10px;
`;

interface ITitle {
  reverse?: boolean;
}

const TitleContainer = styled.div<ITitle>`
  display: flex;
  justify-content: space-around;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  color: #ffffff;
  font-weight: bold;
  padding: 6px 0;
  gap: 20px;
  background-color: #333333;

  span {
    min-width: 70px;
  }
`;

export {
  Container,
  PriceWrapper,
  PriceSection,
  PriceLevelRowContainer,
  PriceLevelContainer,
  SpreadContainer,
  TitleContainer,
};
