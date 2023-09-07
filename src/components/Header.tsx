import React from 'react'
import { styled } from 'styled-components'
import {
    fontLogo,
    largeSize,
    boldWeight,
    logoSize,
    semiboldWeight,
} from '../style/font'

const HeaderWrapper = styled.div`
    height: 100%;
    display: flex;

    margin: 0 10vw;
    & > * {
        display: flex;
        align-items: center;
    }
`

const Logo = styled.div`
    font-family: ${fontLogo};
    font-size: ${logoSize};
    font-weight: ${boldWeight};
    color: rgb(229, 9, 20);
    margin-right: 1vw;
`

const Nav = styled.ul`
    flex: 3;
    & > li {
        padding: 0 1vw;
        white-space: nowrap;
        font-size: ${largeSize};
        font-weight: ${semiboldWeight};
    }
    @media screen and (max-width: 768px) {
        display: none;
    }
`

const Menu = styled.div`
    column-gap: 10px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`

const MenuButton = styled.button`
    width: 4.5rem;
    text-align: center;
    padding: 0.4rem 0.4rem 0.5rem;
    border-radius: 7px;
    background-color: rgb(229, 9, 20);
    font-weight: ${semiboldWeight};
`

function Header() {
    return (
        <HeaderWrapper>
            <Logo>CUT</Logo>
            <Nav>
                <li>영화</li>
                <li>TV</li>
                <li>인물</li>
            </Nav>
            <Menu>
                <MenuButton>로그인</MenuButton>
                <MenuButton>회원가입</MenuButton>
            </Menu>
        </HeaderWrapper>
    )
}
export default Header
