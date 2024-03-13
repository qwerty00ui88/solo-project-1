import React, { ChangeEvent } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Input from './commons/Input'
import { SignUpUser } from '../pages/SignUp'
import Button from './commons/Button'

function SignUp2({
    user,
    handleChange,
}: {
    user: SignUpUser
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const navigate = useNavigate()
    return (
        <div>
            <label htmlFor="birth">출생연도</label>
            <Input
                id="birth"
                value={user.birth}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="birth"
            />
            <label htmlFor="gender">성별</label>
            <Input
                id="gender"
                value={user.gender}
                onChange={(e) => {
                    handleChange(e)
                }}
                name="gender"
            />
            <Button
                name="회원가입"
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
                                navigate('/signup/3', {
                                    state: response.data.userId,
                                })
                            } else {
                                // eslint-disable-next-line no-alert
                                alert(response.data.error_message)
                            }
                        })
                }}
                width="20rem"
                height="3rem"
            />
        </div>
    )
}

export default SignUp2
