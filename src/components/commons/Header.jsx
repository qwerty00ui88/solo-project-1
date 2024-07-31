import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactComponent as User } from '../../assets/user.svg'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import Button from './Button'
import LinkButton from './LinkButton'
import { useAuthContext } from '../../context/AuthContext'

const HeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    margin: 0 10vw;
    height: 15vh;
    max-height: 120px;
    & > * {
        display: flex;
        align-items: center;
    }
    @media screen and (max-width: 768px) {
        margin: 0 4vw;
    }
    @media screen and (max-width: 375px) {
        margin: 0 3vw;
    }
`

const Menu = styled.div`
    column-gap: 1rem;
    @media screen and (max-width: 768px) {
        flex: 1;
        justify-content: flex-end;
    }
`

export default function Header() {
    const { user, logout } = useAuthContext()

    return (
        <HeaderWrapper>
            <Link to="/">
                <Logo />
            </Link>
            {user ? (
                <Menu>
                    <Link to="/mypage/favorite">
                        <User />
                    </Link>
                    <Button name="로그아웃" onClick={logout} />
                </Menu>
            ) : (
                <Menu>
                    <LinkButton name="로그인" to="/login" height="2.4rem" />
                    <LinkButton name="회원가입" to="signup/1" height="2.4rem" />
                </Menu>
            )}
        </HeaderWrapper>
    )
}
