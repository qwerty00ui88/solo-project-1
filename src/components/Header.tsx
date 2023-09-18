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
import { useAppDispatch, useAppSelector } from '../hooks'
import Button from './commons/Button'
import { logout } from '../reducers/userReducer'
import LinkTo from './commons/LinkTo'

const HeaderWrapper = styled.div`
    display: flex;
    margin: 0 10vw;
    & > * {
        display: flex;
        align-items: center;
    }
    height: 15vh;
    max-height: 120px;
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

function Header() {
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector((state) => {
        // eslint-disable-next-line no-console
        console.log(state.ui.status)
        return !!state.user.user
    })

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
            {isLogin ? (
                <Menu>
                    <Button
                        name="로그아웃"
                        onClick={() => {
                            dispatch(logout())
                        }}
                        width="4.5rem"
                        height="2.4rem"
                    />
                </Menu>
            ) : (
                <Menu>
                    <Sun />
                    <Moon />
                    <LinkTo name="로그인" to="/login" height="2.4rem" />
                    <LinkTo name="회원가입" to="/signup" height="2.4rem" />
                </Menu>
            )}
        </HeaderWrapper>
    )
}
export default Header
