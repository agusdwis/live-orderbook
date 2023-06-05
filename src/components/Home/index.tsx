import { useState, useEffect } from 'react';

import WatchList from '@/components/Watchlist';
import OrderBook from '@/components/Orderbook';

import { Container, LeftWrapper, RightWrapper } from './styled';

export default function HomePage() {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleWindowResize = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    handleWindowResize();
  }, []);

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
        setIsActive(false);
      } else {
        document.title = 'CLP - Crypto Live Price';
        setIsActive(true);
      }
    };

    if (typeof document.addEventListener !== 'undefined' && hidden !== '') {
      document.addEventListener(
        visibilityChange,
        handleVisibilityChange,
        false
      );
    }

    return () => {
      document.removeEventListener(
        visibilityChange,
        handleVisibilityChange,
        false
      );
    };
  }, []);

  if (!windowWidth) return <div />;

  const isMobile = Boolean(windowWidth < 900);

  return (
    <Container isMobile={isMobile}>
      <LeftWrapper isMobile={isMobile}>
        <WatchList isActive={isActive} />
      </LeftWrapper>
      <RightWrapper>
        <OrderBook isActive={isActive} isMobile={isMobile} />
      </RightWrapper>
    </Container>
  );
}
