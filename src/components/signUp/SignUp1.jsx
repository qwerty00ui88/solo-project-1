import React from 'react'
import styled from 'styled-components'
import Input from '../commons/Input'
import LinkButton from '../commons/LinkButton'
import { ReactComponent as Next } from '../../assets/next.svg'

const Buttons = styled.div`
    display: flex;
    justify-content: end;
`

export default function SignUp1({ user, handleChange }) {
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
                <LinkButton to="/signup/2">
                    <Next />
                </LinkButton>
            </Buttons>
        </>
    )
}
