import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Input from '../components/commons/Input'
import Button from '../components/commons/Button'
import { logoSize } from '../style/font'
import { login } from '../reducers/userReducer'

export const LoginWrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input[type='text'],
    input[type='password'],
    button {
        height: 3rem;
    }
    > div {
        width: 35vw;
    }
    > div > * {
        margin-bottom: 1rem;
    }
    a {
        display: block;
    }
`

export const Title = styled.h2`
    font-size: ${logoSize};
`

function Login() {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const dispatch = useDispatch()
    // const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const [nickname, setNickname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    return (
        <LoginWrapper>
            <Title>Login</Title>
            <div>
                <Input
                    value={nickname}
                    onChange={(e) => {
                        setNickname(e.target.value)
                    }}
                    label="닉네임"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    label="비밀번호"
                />
                <Link to="/signup/1">회원이 아니십니까?</Link>
                <Button
                    name="로그인"
                    onClick={() => {
                        axios
                            .post(
                                `${serverUrl}/user/login`,
                                {
                                    nickname,
                                    password,
                                },
                                { withCredentials: true }
                            )
                            .then((response) => {
                                if (response.data.code === 200) {
                                    dispatch(login())
                                    navigate(`/`)
                                }
                            })
                            .catch((error) => {
                                // eslint-disable-next-line no-alert
                                alert(error)
                            })
                    }}
                    width="100%"
                />
            </div>
        </LoginWrapper>
    )
}

export default Login
