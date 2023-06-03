import WatchList from '@/components/Watchlist';

import { Container, LeftWrapper, RightWrapper } from './styled';

export default function HomePage() {
  return (
    <Container>
      <LeftWrapper>
        <WatchList />
      </LeftWrapper>
      <RightWrapper>Right Container</RightWrapper>
    </Container>
  );
}
