import { useState, useEffect } from 'react';

import WatchList from '@/components/Watchlist';

import { Container, LeftWrapper, RightWrapper } from './styled';

export default function HomePage() {
  const [isPageVisible, setIsPageVisible] = useState<boolean>(true);

  useEffect(() => {
    let hidden: string = '';
    let visibilityChange: string = '';

    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else {
      // @ts-ignore
      if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
      }

      // @ts-ignore
      if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
      }
    }

    const handleVisibilityChange = () => {
      const isHidden = document.hidden;
      if (isHidden) {
        document.title = 'CLP Paused';
        setIsPageVisible(false);
      } else {
        document.title = 'CLP - Crypto Live Price';
        setIsPageVisible(true);
      }
    };

    if (typeof document.addEventListener !== 'undefined' && hidden !== '') {
      document.addEventListener(
        visibilityChange,
        handleVisibilityChange,
        false
      );
    }
  }, []);

  return (
    <Container>
      <LeftWrapper>
        <WatchList isActive={isPageVisible} />
      </LeftWrapper>
      <RightWrapper>Right Container</RightWrapper>
    </Container>
  );
}
