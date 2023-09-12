import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../components/commons/Input'
import { login } from '../reducers/userReducer'
import { useAppDispatch } from '../hooks'
import Button from '../components/commons/Button'
import PageTemplate from '../components/templates/PageTemplate'
import { logoSize } from '../style/font'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

export const LoginWrapper = styled.div`
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
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    initializeApp(firebaseConfig)
    const auth = getAuth()

    const logIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential
                return { email: user.email, uid: user.uid }
            })
            .then((user) => {
                dispatch(login(user))
            })
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // eslint-disable-next-line no-console
                console.log({ errorCode, errorMessage })
            })
    }

    return (
        <PageTemplate>
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
                <Button
                    name="로그인"
                    onClick={logIn}
                    width="20rem"
                    height="3rem"
                />
            </LoginWrapper>
        </PageTemplate>
    )
}

export default Login
