import { Container, LeftSkeleton, RightSkeleton, Box } from './styled';

export default function OrderbookSkeleton() {
  return (
    <Container>
      <LeftSkeleton />
      <RightSkeleton>
        {Array.from({ length: 10 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={index} />
        ))}
      </RightSkeleton>
    </Container>
  );
}
