import type { AppProps } from 'next/app';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import NextHeadSeo from 'next-head-seo';

import GlobalStyle from '@/utils/globalStyle';
import '@/assets/css/fonts.css';

const theme: DefaultTheme = {
  colors: {
    primary: '#00AB6B',
    secondary: '#0070f3',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHeadSeo title="Crypto Live Price" description="Crypto Live Price" />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
