import React, { useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { LoginWrapper as SignUpWrpper, Title } from './Login'
import SignUp1 from '../components/SignUp1'
import SignUp2 from '../components/SignUp2'
import SignUp3 from '../components/SignUp3'

export interface SignUpUser {
    name: string
    nickname: string
    email: string
    password: string
    passwordCheck: string
    birth: number
    gender: string
}

function SignUp() {
    const { page } = useParams()
    const [user, setUser] = useState<SignUpUser>({
        name: '',
        nickname: '',
        email: '',
        password: '',
        passwordCheck: '',
        birth: 0,
        gender: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser(() => ({
            ...user,
            [name]: value,
        }))
    }

    let children = null
    if (page === '1') {
        children = <SignUp1 user={user} handleChange={handleChange} />
    } else if (page === '2') {
        children = <SignUp2 user={user} handleChange={handleChange} />
    } else if (page === '3') {
        children = <SignUp3 user={user} />
    }

    return (
        <SignUpWrpper>
            <Title>SignUp</Title>
            {children}
        </SignUpWrpper>
    )
}

export default SignUp
