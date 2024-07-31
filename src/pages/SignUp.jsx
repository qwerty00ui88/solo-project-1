import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { LoginWrapper as SignUpWrpper, Title } from './Login'
import SignUp1 from '../components/signUp/SignUp1'
import SignUp2 from '../components/signUp/SignUp2'
import SignUp3 from '../components/signUp/SignUp3'
import SignUp4 from '../components/signUp/SignUp4'
import useObjectInput from '../hooks/useObjectInput'

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
    const { obj: user, onChange: setUser } = useObjectInput({
        name: '',
        email: '',
        nickname: '',
        password: '',
        passwordCheck: '',
        birth: undefined,
        gender: '',
    })

    let children = null
    if (page === '1') {
        children = <SignUp1 user={user} onChange={setUser} />
    } else if (page === '2') {
        children = <SignUp2 user={user} onChange={setUser} />
    } else if (page === '3') {
        children = <SignUp3 user={user} onChange={setUser} />
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
