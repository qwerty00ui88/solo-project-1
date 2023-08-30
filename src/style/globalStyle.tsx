import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #E5E5E5;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  input {
    all: unset;
  }
`

export default GlobalStyle
