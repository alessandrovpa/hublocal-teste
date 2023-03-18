import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    width: 100vw;
    height: 100vh;
  }
  body, input, textarea, button{
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
  }
  button:hover{
    cursor: pointer;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;
