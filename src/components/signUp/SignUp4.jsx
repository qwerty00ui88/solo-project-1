import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../commons/Button'
import { postData } from '../../api/server'

export default function SignUp4({ user }) {
    const { state } = useLocation()
    const navigate = useNavigate()

    const resendEmail = () => {
        postData('/user/resend-verification-email', {
            userId: state,
            purpose: '회원가입',
        }).then((res) => {
            if (res.code === 200) {
                // eslint-disable-next-line no-alert
                alert('회원가입 완료')
                navigate('/login')
            }
        })
    }

    return (
        <div>
            <h2>인증 메일이 발송되었습니다</h2>
            <div>
                메일함에서{user.email} 인증 메일을 확인 바랍니다. 이메일의 인증
                링크를 클릭하면 회원가입이 완료됩니다.
            </div>
            <Button
                name="인증 메일 다시 보내기"
                onClick={resendEmail}
                width="20rem"
                height="3rem"
            />
        </div>
    )
}
