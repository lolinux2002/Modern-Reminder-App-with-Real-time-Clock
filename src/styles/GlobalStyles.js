import { createGlobalStyle } from 'styled-components';

    const GlobalStyles = createGlobalStyle`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background: linear-gradient(to bottom, #1e3c72, #2a5298);
        min-height: 100vh;
        font-family: 'Segoe UI', sans-serif;
        color: #fff;
        line-height: 1.6;
      }

      input, button {
        font-family: inherit;
        color: inherit;
      }

      a {
        color: #fff;
        text-decoration: none;
      }

      h1, h2, h3, h4, h5, h6 {
        color: #fff;
      }
    `;

    export default GlobalStyles;
