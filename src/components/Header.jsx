import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as User } from '../assets/user.svg'
import { ReactComponent as Logo } from '../assets/logo.svg'
import Button from './commons/Button'
import LinkTo from './commons/LinkTo'
import { logout } from '../reducers/userReducer'

const HeaderWrapper = styled.div`
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
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const clientUrl = process.env.REACT_APP_CLIENT_URL
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector((state) => state.user)

    return (
        <HeaderWrapper>
            <Link to="/">
                <Logo />
            </Link>
            {isLoggedIn ? (
                <Menu>
                    <Link to="/mypage/favorite">
                        <User />
                    </Link>
                    <Button
                        name="로그아웃"
                        onClick={() => {
                            axios
                                .get(`${serverUrl}/user/logout`, {
                                    withCredentials: true,
                                })
                                .then(() => {
                                    dispatch(logout())
                                    window.location.href = `${clientUrl}`
                                })
                        }}
                    />
                </Menu>
            ) : (
                <Menu>
                    <LinkTo name="로그인" to="/login" height="2.4rem" />
                    <LinkTo name="회원가입" to="signup/1" height="2.4rem" />
                </Menu>
            )}
        </HeaderWrapper>
    )
}
