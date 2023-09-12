import React, { useState } from 'react'
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Input from '../components/commons/Input'
import { login } from '../reducers/userReducer'
import { useAppDispatch } from '../hooks'
import Button from '../components/commons/Button'
import PageTemplate from '../components/templates/PageTemplate'
import { xxlargeSize } from '../style/font'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 15rem;
    background-color: yellow;
`

const Title = styled.h2`
    font-size: ${xxlargeSize};
`

function Login() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    initializeApp(firebaseConfig)
    const auth = getAuth()

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential
                // eslint-disable-next-line no-console
                console.log(user)
            })
            .then(() => {
                // eslint-disable-next-line no-console
                console.log('회원가입 성공')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // eslint-disable-next-line no-console
                console.log({ errorCode, errorMessage })
            })
    }

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

    // const logOut = () => {
    //     signOut(auth)
    //         .then(() => {
    //             dispatch(logout())
    //             // eslint-disable-next-line no-console
    //             console.log('로그아웃 성공')
    //         })
    //         .catch((error) => {
    //             // eslint-disable-next-line no-console
    //             console.log(error)
    //             // eslint-disable-next-line no-console
    //             console.log('로그아웃 실패??')
    //         })
    // }

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
                <Button
                    name="로그인"
                    onClick={logIn}
                    width="20rem"
                    height="3rem"
                />
                <Button name="회원가입" onClick={createUser} />
            </LoginWrapper>
        </PageTemplate>
    )
}

export default Login
