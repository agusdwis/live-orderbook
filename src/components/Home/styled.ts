import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 25% 75%;
  grid-auto-flow: column;
  grid-gap: 20px;

  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const Wrapper = styled.div`
  padding: 20px 0;
`;

const LeftWrapper = styled(Wrapper)`
  // background: yellow;
`;

const RightWrapper = styled(Wrapper)`
  // background: cyan;
`;

export { Container, LeftWrapper, RightWrapper };
