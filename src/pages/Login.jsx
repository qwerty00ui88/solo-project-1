import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../components/commons/Input'
import Button from '../components/commons/Button'
import { logoSize } from '../style/font'
import { useAuthContext } from '../context/AuthContext'
import useTextInput from '../hooks/useTextInput'

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
    const { value: nickname, onChange: handleNickname } = useTextInput()
    const { value: password, onChange: handlePassword } = useTextInput()

    return (
        <LoginWrapper>
            <Title>Login</Title>
            <div>
                <Input
                    label="닉네임"
                    value={nickname}
                    onChange={handleNickname}
                />
                <Input
                    type="password"
                    label="비밀번호"
                    value={password}
                    onChange={handlePassword}
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
