import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const LeftSkeleton = styled.div`
  background: #ededed;
  border-radius: 8px;
  flex: 1;
  min-height: 500px;
`;

const RightSkeleton = styled(LeftSkeleton)`
  background: unset;
  border: 1px solid #ededed;
`;

const Box = styled.div`
  background: #ededed;
  height: 30px;
  margin: 20px;
  border-radius: 8px;
`;

export { Container, LeftSkeleton, RightSkeleton, Box };
