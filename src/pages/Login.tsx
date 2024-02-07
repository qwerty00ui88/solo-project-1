import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import Input from '../components/commons/Input'
import Button from '../components/commons/Button'
import { logoSize } from '../style/font'

export const LoginWrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Title = styled.h2`
    font-size: ${logoSize};
`

function Login() {
    const [nickname, setNickname] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <LoginWrapper>
            <Title>Login</Title>
            <label htmlFor="nickname">닉네임</label>
            <Input
                value={nickname}
                onChange={(e) => {
                    setNickname(e.target.value)
                }}
            />
            <label htmlFor="password">비밀번호</label>
            <Input
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <Link to="/signup/1">회원이 아니십니까?</Link>
            <Button
                name="로그인"
                onClick={() => {
                    axios
                        .post(
                            'http://localhost/user/login',
                            {
                                nickname,
                                password,
                            },
                            { withCredentials: true }
                        )
                        .then((response) => {
                            // eslint-disable-next-line no-alert
                            alert(response.data.code)
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-alert
                            alert(error)
                        })
                }}
                width="20rem"
                height="3rem"
            />
        </LoginWrapper>
    )
}

export default Login
