import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import {
    fontLogo,
    largeSize,
    boldWeight,
    logoSize,
    semiboldWeight,
} from '../style/font'
import { ReactComponent as Sun } from '../assets/sun.svg'
import { ReactComponent as Moon } from '../assets/moon.svg'
import { xsmallRadius } from '../style/border'

const HeaderWrapper = styled.div`
    height: 100%;
    display: flex;
    margin: 0 10vw;
    & > * {
        display: flex;
        align-items: center;
    }
`

const Logo = styled.h1`
    font-family: ${fontLogo};
    font-size: ${logoSize};
    font-weight: ${boldWeight};
    color: rgb(229, 9, 20);
    margin-right: 1vw;
`

const Nav = styled.ul`
    flex: 1;
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
        /* display: none; */
        flex: 1;
        justify-content: flex-end;
    }
`

const MenuButton = styled(Link)`
    width: 4.5rem;
    text-align: center;
    padding: 0.4rem;
    border-radius: ${xsmallRadius};
    background-color: rgb(229, 9, 20);
    font-weight: ${semiboldWeight};
`

function Header() {
    const navList = ['영화', 'TV', '인물']

    return (
        <HeaderWrapper>
            <Link to="/">
                <Logo>CUT</Logo>
            </Link>
            <Nav>
                {navList.map((list) => {
                    return <li key={list}>{list}</li>
                })}
            </Nav>
            <Menu>
                <Sun />
                <Moon />
                <MenuButton to="/login">로그인</MenuButton>
                <MenuButton to="/signup">회원가입</MenuButton>
            </Menu>
        </HeaderWrapper>
    )
}
export default Header
