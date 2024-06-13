import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { LoginWrapper as SignUpWrpper, Title } from './Login'
import SignUp1 from '../components/SignUp1'
import SignUp2 from '../components/SignUp2'
import SignUp3 from '../components/SignUp3'
import SignUp4 from '../components/SignUp4'

const ChildrenWrapper = styled.div`
    width: 35vw;
    input[type='text'],
    input[type='password'],
    select,
    a,
    button {
        height: 3rem;
    }
    > div {
        margin-bottom: 1rem;
    }
`

export default function SignUp() {
    const { page } = useParams()
    const [user, setUser] = useState({
        name: '',
        email: '',
        nickname: '',
        password: '',
        passwordCheck: '',
        birth: undefined,
        gender: '',
    })

    const handleChange = (e) => {
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
        children = <SignUp3 user={user} handleChange={handleChange} />
    } else if (page === '4') {
        children = <SignUp4 user={user} />
    }

    return (
        <SignUpWrpper>
            <Title>SignUp</Title>
            <ChildrenWrapper>{children}</ChildrenWrapper>
        </SignUpWrpper>
    )
}
