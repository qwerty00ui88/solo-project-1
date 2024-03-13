import React from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from './commons/Button'
import { SignUpUser } from '../pages/SignUp'

function SignUp3({ user }: { user: SignUpUser }) {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const { state } = useLocation()
    const navigate = useNavigate()
    return (
        <div>
            <h2>인증 메일이 발송되었습니다</h2>
            <div>
                메일함에서{user.email} 인증 메일을 확인 바랍니다. 이메일의 인증
                링크를 클릭하면 회원가입이 완료됩니다.
            </div>
            <Button
                name="인증 메일 다시 보내기"
                onClick={() => {
                    axios
                        .post(
                            `${serverUrl}/user/resend-verification-email`,
                            {
                                userId: state,
                                purpose: '회원가입',
                            },
                            { withCredentials: true }
                        )
                        .then((response) => {
                            if (response.data.code === 200) {
                                // eslint-disable-next-line no-alert
                                alert('회원가입 완료')
                                navigate('/login')
                            }
                        })
                }}
                width="20rem"
                height="3rem"
            />
        </div>
    )
}
export default SignUp3
