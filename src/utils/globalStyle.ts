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
    font-family: 'ProximaNova';
    color: #333333;
  }
`;

export default GlobalStyle;
