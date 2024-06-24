import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../components/commons/Input'
import Button from '../components/commons/Button'
import { logoSize } from '../style/font'
import { useAuthContext } from '../context/AuthContext'

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

export default function Login() {
    const { login } = useAuthContext()
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')

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
                        login(nickname, password)
                    }}
                    width="100%"
                />
            </div>
        </LoginWrapper>
    )
}
