import React, { ChangeEvent } from 'react'
import Button from './commons/Button'
import Input from './commons/Input'
import LinkTo from './commons/LinkTo'
import { SignUpUser } from '../pages/SignUp'

function SignUp1({
    user,
    handleChange,
}: {
    user: SignUpUser
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <>
            <label htmlFor="name">이름</label>
            <Input
                id="name"
                value={user.name}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="name"
            />
            <label htmlFor="nickname">닉네임</label>
            <Input
                id="nickname"
                value={user.nickname}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="nickname"
            />
            <Button name="닉네임 중복" onClick={() => {}} />
            <label htmlFor="email">이메일</label>
            <Input
                id="email"
                value={user.email}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="email"
            />
            <label htmlFor="password">비밀번호</label>
            <Input
                id="password"
                value={user.password}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="password"
            />
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <Input
                id="passwordCheck"
                value={user.passwordCheck}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="passwordCheck"
            />
            <div>불일치</div>
            <div>일치</div>
            <LinkTo name="다음" to="/signup/2" height="2.4rem" />
        </>
    )
}

export default SignUp1
