import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fontLogo, boldWeight, logoSize } from '../style/font'
import { ReactComponent as User } from '../assets/user.svg'
import Button from './commons/Button'
import LinkTo from './commons/LinkTo'
import { logout } from '../reducers/userReducer'

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
                <Logo>GOODORBAD</Logo>
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
