import React from 'react'
import styled from 'styled-components'
import Input from './commons/Input'
import LinkTo from './commons/LinkTo'
import { ReactComponent as Next } from '../assets/next.svg'

const Buttons = styled.div`
    display: flex;
    justify-content: end;
`

function SignUp1({ user, handleChange }) {
    return (
        <>
            <Input
                id="name"
                value={user.name}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="name"
                label="이름"
            />
            <Input
                id="email"
                value={user.email}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="email"
                label="이메일"
            />
            <Buttons>
                <LinkTo to="/signup/2">
                    <Next />
                </LinkTo>
            </Buttons>
        </>
    )
}

export default SignUp1
