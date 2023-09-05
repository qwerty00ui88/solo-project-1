import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: black;
  }

  footer {
    border-top: 1px solid #a5a5a7;
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
