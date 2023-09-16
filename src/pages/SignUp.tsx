import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { useNavigate } from 'react-router-dom'
import { LoginWrapper as SignUpWrpper, Title } from './Login'
import Button from '../components/commons/Button'
import Input from '../components/commons/Input'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

function SignUp() {
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
                navigate('/login')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // eslint-disable-next-line no-console
                console.log({ errorCode, errorMessage })
            })
    }

    return (
        <SignUpWrpper>
            <Title>SignUp</Title>
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
                name="회원가입"
                onClick={createUser}
                width="20rem"
                height="3rem"
            />
        </SignUpWrpper>
    )
}

export default SignUp
