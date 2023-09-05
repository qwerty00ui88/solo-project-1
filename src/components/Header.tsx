import React from 'react'
import { styled } from 'styled-components'
import {
    boldWeight,
    xsmallSize,
    smallSize,
    xlargeSize,
    mediumWeight,
} from '../style/font'

const HeaderWrapper = styled.div`
    height: 100%;
    display: flex;
    color: #e5e5e5;
    margin: 0 10vw;
    & > * {
        display: flex;
        align-items: center;
    }
`

const Logo = styled.div`
    font-family: 'Yesteryear', cursive;
    font-size: 2rem;
    color: rgb(229, 9, 20);
    margin-right: 1vw;
    font-weight: ${boldWeight};
    font-size: ${xlargeSize};
`

const Nav = styled.ul`
    flex: 3;
    font-size: ${smallSize};
    & > li {
        height: 100%;
        line-height: 15vh;
        padding: 0 1vw;
    }
`

const Menu = styled.div`
    column-gap: 10px;
`

const MenuButton = styled.button`
    width: 4.5rem;
    text-align: center;
    padding: 0.4rem 0.4rem 0.5rem;
    border-radius: 7px;
    background-color: rgb(229, 9, 20);
    font-size: ${xsmallSize};
    font-weight: ${mediumWeight};
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
