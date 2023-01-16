import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  padding: 30px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  font-size: 16px;
  font-weight: 700;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
`;

export default GlobalStyle;
