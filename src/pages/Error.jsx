import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from '../components/commons/Button'

const ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 1rem;
`

export default function Error() {
    const navigate = useNavigate()
    return (
        <ErrorWrapper>
            오류가 발생했습니다.
            <Button
                onClick={() => navigate('/')}
                name="메인페이지로 돌아가기"
            />
        </ErrorWrapper>
    )
}
