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
    }
  }

  body {
    background-color: black;
    min-width: 320px;
  }

  main {
    margin: 0 10vw;
    font-family: ${fontKR};
    & > *:not(:last-child) {
      margin-bottom: 1rem;
    }
    &::after {
        content: '';
        display: block;
        height: 15vh;
        max-height: 120px;
    }
    @media screen and (max-width: 768px) {
        margin: 0 4vw;
    }
    @media screen and (max-width: 375px) {
        margin: 0 3vw;
    }
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
    box-sizing: border-box;
    white-space: nowrap;
  }

  input {
    all: unset;
    box-sizing: border-box;
  }
`

export default GlobalStyle
