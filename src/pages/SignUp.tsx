import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { LoginWrapper as SignUpWrpper, Title } from './Login'
import Button from '../components/commons/Button'
import Input from '../components/commons/Input'
import LinkTo from '../components/commons/LinkTo'

function SignUp() {
    const { page } = useParams()
    const [name, setName] = useState<string>('')
    const [nickname, setNickname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordCheck, setPasswordCheck] = useState<string>('')
    const [birth, setBirth] = useState<number>(0)
    const [gender, setGender] = useState<string>('')

    return (
        <SignUpWrpper>
            <Title>SignUp</Title>
            {page === '1' ? (
                <>
                    <label htmlFor="name">이름</label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <label htmlFor="nickname">닉네임</label>
                    <Input
                        id="nickname"
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.target.value)
                        }}
                    />
                    <Button
                        name="닉네임중복"
                        onClick={() => {}}
                        width="20rem"
                        height="3rem"
                    />
                    <label htmlFor="email">이메일</label>
                    <Input
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <Button
                        name="이메일인증"
                        onClick={() => {}}
                        width="20rem"
                        height="3rem"
                    />
                    <label htmlFor="password">비밀번호</label>
                    <Input
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <label htmlFor="passwordCheck">비밀번호 확인</label>
                    <Input
                        id="passwordCheck"
                        value={passwordCheck}
                        onChange={(e) => {
                            setPasswordCheck(e.target.value)
                        }}
                    />
                    <div>불일치</div>
                    <div>일치</div>
                    <LinkTo name="다음" to="/signup/2" height="2.4rem" />
                </>
            ) : (
                <div>
                    <label htmlFor="birth">출생연도</label>
                    <Input
                        id="birth"
                        value={birth}
                        onChange={(e) => {
                            setBirth(Number(e.target.value))
                        }}
                    />
                    <label htmlFor="gender">성별</label>
                    <Input
                        id="gender"
                        value={gender}
                        onChange={(e) => {
                            setGender(e.target.value)
                        }}
                    />
                    <Button
                        name="회원가입"
                        onClick={() => {
                            axios.post(
                                'http://localhost/user/create',
                                {
                                    name,
                                    nickname,
                                    email,
                                    password,
                                    birth,
                                    gender,
                                },
                                { withCredentials: true }
                            )
                        }}
                        width="20rem"
                        height="3rem"
                    />
                </div>
            )}
        </SignUpWrpper>
    )
}

export default SignUp
