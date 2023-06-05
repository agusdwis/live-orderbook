import styled, { css } from 'styled-components';

interface IContainer {
  isMobile: boolean;
}

const Container = styled.div<IContainer>`
  display: flex;
  gap: 20px;

  ${({ isMobile }) =>
    isMobile &&
    css`
      display: flex;
      flex-direction: column;
      gap: 0;
      height: 100%;
    `}
`;

const Wrapper = styled.div`
  padding: 20px 0;
  height: 100%;
`;

const LeftWrapper = styled(Wrapper)<IContainer>`
  width: 25%;

  ${({ isMobile }) =>
    isMobile &&
    css`
      width: 100%;
    `}
`;

const RightWrapper = styled(Wrapper)`
  flex: 1;
`;

export { Container, LeftWrapper, RightWrapper };
