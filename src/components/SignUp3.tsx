import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Input from './commons/Input'
import { SignUpUser } from '../pages/SignUp'
import LinkTo from './commons/LinkTo'
import { ReactComponent as Pre } from '../assets/pre.svg'
import { ReactComponent as Next } from '../assets/next.svg'
import Button from './commons/Button'

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
`

function SignUp3({
    user,
    handleChange,
}: {
    user: SignUpUser
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const navigate = useNavigate()
    return (
        <>
            <Input
                id="birth"
                value={user.birth}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="birth"
                label="출생연도"
            />
            <Input
                id="gender"
                value={user.gender}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="gender"
                label="성별"
            />

            <Buttons>
                <LinkTo to="/signup/2">
                    <Pre />
                </LinkTo>
                <Button
                    onClick={() => {
                        axios
                            .post(
                                `${serverUrl}/user/create`,
                                {
                                    name: user.name,
                                    nickname: user.nickname,
                                    email: user.email,
                                    password: user.password,
                                    birth: user.birth,
                                    gender: user.gender,
                                },
                                { withCredentials: true }
                            )
                            .then((response) => {
                                if (response.data.code === 200) {
                                    navigate('/signup/4', {
                                        state: response.data.userId,
                                    })
                                } else {
                                    // eslint-disable-next-line no-alert
                                    alert(response.data.error_message)
                                }
                            })
                    }}
                >
                    <Next />
                </Button>
            </Buttons>
        </>
    )
}

export default SignUp3
