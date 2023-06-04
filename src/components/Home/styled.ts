import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  gap: 20px;

  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 20px 0;
  height: 100%;
`;

const LeftWrapper = styled(Wrapper)`
  width: 22%;

  @media (max-width: 550px) {
    width: 100%;
  }
`;

const RightWrapper = styled(Wrapper)`
  flex: 1;
`;

export { Container, LeftWrapper, RightWrapper };
