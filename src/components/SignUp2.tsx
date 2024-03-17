import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from './commons/Button'
import Input from './commons/Input'
import LinkTo from './commons/LinkTo'
import { SignUpUser } from '../pages/SignUp'
import { ReactComponent as Pre } from '../assets/pre.svg'
import { ReactComponent as Next } from '../assets/next.svg'

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

function SignUp1({
    user,
    handleChange,
}: {
    user: SignUpUser
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
    const [isSame, setIsSame] = useState<boolean | null>(null)

    useEffect(() => {
        if (user.passwordCheck === '') {
            setIsSame(null)
        } else if (user.password === user.passwordCheck) {
            setIsSame(true)
        } else {
            setIsSame(false)
        }
    }, [user.password, user.passwordCheck])

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
                <Button name="중복 확인" onClick={() => {}} />
            </NicknameSet>
            <div>이미 사용중인 닉네임입니다.</div>
            <div>사용 가능한 닉네임입니다.</div>
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
            {isSame === null && <div />}
            {isSame === false && <div>불일치</div>}
            {isSame === true && <div>일치</div>}
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
