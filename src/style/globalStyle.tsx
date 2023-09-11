import { createGlobalStyle } from 'styled-components'
import { fontKR, mediumSize, smallSize } from './font'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: ${mediumSize};
    font-family: ${fontKR};
    color: #e5e5e5;
    @media screen and (max-width: 375px) {
        font-size: ${smallSize};
        color: black;
    }
  }

  body {
    background-color: black;
    min-width: 320px;
  }

  main{
    font-family: ${fontKR};
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
