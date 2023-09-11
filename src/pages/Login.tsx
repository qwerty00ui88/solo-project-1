import React, { useState } from 'react'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import Input from '../components/common/Input'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    initializeApp(firebaseConfig)

    const auth = getAuth()
    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { user } = userCredential
                // eslint-disable-next-line no-console
                console.log({ user })
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
                // eslint-disable-next-line no-console
                console.log({ user })
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // eslint-disable-next-line no-console
                console.log({ errorCode, errorMessage })
            })
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    }

    return (
        <>
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
            <button type="button" onClick={createUser}>
                회원가입
            </button>
            <button type="button" onClick={logIn}>
                로그인
            </button>
            <button type="button" onClick={logOut}>
                로그아웃
            </button>
        </>
    )
}

export default Login
