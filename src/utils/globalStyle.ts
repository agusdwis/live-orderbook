import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Proxima Nova';
  }
  
  @font-face {
    font-family: 'Proxima Nova';
    src: url('../assets/font/ProximaNova-Regular.eot');
    src: url('../assets/font/ProximaNova-Regular.eot?#iefix') format('embedded-opentype'),
      url('../assets/font/ProximaNova-Regular.woff') format('woff'),
      url('../assets/font/ProximaNova-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Proxima Nova';
    src: url('../assets/font/ProximaNova-BoldIt.eot');
    src: url('../assets/font/ProximaNova-BoldIt.eot?#iefix') format('embedded-opentype'),
      url('../assets/font/ProximaNova-BoldIt.woff') format('woff'),
      url('../assets/font/ProximaNova-BoldIt.ttf') format('truetype');
    font-weight: bold;
    font-style: italic;
  }
  
  @font-face {
    font-family: 'Proxima Nova';
    src: url('../assets/font/ProximaNova-Bold.eot');
    src: url('../assets/font/ProximaNova-Bold.eot?#iefix') format('embedded-opentype'),
      url('../assets/font/ProximaNova-Bold.woff') format('woff'),
      url('../assets/font/ProximaNova-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Proxima Nova';
    src: url('../assets/font/ProximaNova-RegularIt.eot');
    src:
      url('../assets/font/ProximaNova-RegularIt.eot?#iefix') format('embedded-opentype'),
      url('../assets/font/ProximaNova-RegularIt.woff') format('woff'),
      url('../assets/font/ProximaNova-RegularIt.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
  }
`;

export default GlobalStyle;
