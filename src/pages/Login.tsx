import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../components/commons/Input'
import { useAppDispatch } from '../hooks'
import Button from '../components/commons/Button'
import { logoSize } from '../style/font'
import { login } from '../reducers/userReducer'

export const LoginWrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > * {
        margin-bottom: 10px;
    }

    & > h2,
    input:last-of-type,
    a {
        margin-bottom: 30px;
    }
`

export const Title = styled.h2`
    font-size: ${logoSize};
`

function Login() {
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const logIn = () => {
        if (email && password) {
            dispatch(login({ email, password }))
        }
    }

    return (
        <LoginWrapper>
            <Title>Login</Title>
            <Input
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            />
            <Input
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <Link to="/signup">회원이 아니십니까?</Link>
            <Button name="로그인" onClick={logIn} width="20rem" height="3rem" />
        </LoginWrapper>
    )
}

export default Login
