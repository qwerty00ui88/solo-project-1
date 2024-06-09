import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Button from './commons/Button'
import Input from './commons/Input'
import LinkTo from './commons/LinkTo'
import { ReactComponent as Pre } from '../assets/pre.svg'
import { ReactComponent as Next } from '../assets/next.svg'
import { ReactComponent as Success } from '../assets/success.svg'
import { ReactComponent as Failure } from '../assets/failure.svg'
import NotificationMessage from './commons/NotificationMessage'

const NicknameSet = styled.div`
    display: flex;
    gap: 1rem;
    > div {
        flex: 1;
    }

    button {
        margin-top: auto;
    }
`

export const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
`

function SignUp1({ user, handleChange }) {
    const [isDuplicated, setIsDuplicated] = useState(null)
    const [isSame, setIsSame] = useState(null)
    const serverUrl = process.env.REACT_APP_SERVER_URL

    useEffect(() => {
        if (user.passwordCheck === '') {
            setIsSame(null)
        } else if (user.password === user.passwordCheck) {
            setIsSame(true)
        } else {
            setIsSame(false)
        }
    }, [user.password, user.passwordCheck])

    useEffect(() => {
        setIsDuplicated(null)
    }, [user.nickname])

    return (
        <>
            <NicknameSet>
                <Input
                    id="nickname"
                    value={user.nickname}
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    name="nickname"
                    label="닉네임"
                />
                <Button
                    name="중복 확인"
                    onClick={() => {
                        axios
                            .get(`${serverUrl}/user/isDuplicated`, {
                                params: {
                                    nickname: user.nickname,
                                },
                                withCredentials: true,
                            })
                            .then((response) => {
                                setIsDuplicated(response.data.result)
                            })
                    }}
                />
            </NicknameSet>
            {isDuplicated === true && (
                <NotificationMessage message="이미 사용중인 닉네임입니다.">
                    <Failure fill="red" />
                </NotificationMessage>
            )}
            {isDuplicated === false && (
                <NotificationMessage message="사용 가능한 닉네임입니다.">
                    <Success fill="green" />
                </NotificationMessage>
            )}
            <Input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="password"
                label="비밀번호"
            />
            <Input
                type="password"
                id="passwordCheck"
                value={user.passwordCheck}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="passwordCheck"
                label="비밀번호 확인"
            />
            {isSame === false && (
                <NotificationMessage message="비밀번호가 일치하지 않습니다.">
                    <Failure fill="red" />
                </NotificationMessage>
            )}
            {isSame === true && (
                <NotificationMessage message="비밀번호가 일치합니다.">
                    <Success fill="green" />
                </NotificationMessage>
            )}
            <Buttons>
                <LinkTo to="/signup/1">
                    <Pre />
                </LinkTo>
                <LinkTo to="/signup/3">
                    <Next />
                </LinkTo>
            </Buttons>
        </>
    )
}

export default SignUp1
