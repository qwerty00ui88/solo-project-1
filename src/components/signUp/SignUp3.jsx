import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import LinkTo from '../commons/LinkTo'
import { ReactComponent as Pre } from '../../assets/pre.svg'
import Button from '../commons/Button'
import { xsmallRadius } from '../../style/border'
import { semiboldWeight } from '../../style/font'
import { Select } from '../main/Trending'
import { postData } from '../../api/server'

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
`

const GenderInput = styled.fieldset`
    display: flex;
    gap: 1rem;
    div {
        flex: 1;
    }
`

const LabelButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${xsmallRadius};
    background-color: ${(props) =>
        props.$isChecked ? 'rgb(229, 9, 20)' : 'gray'};
    font-weight: ${semiboldWeight};
    padding: 0.5rem;
    width: 100%;
    height: 3rem;
`

const BirthSelect = styled(Select)`
    width: 100%;
    margin: 0;
    text-align: center;
`

export default function SignUp3({ user, handleChange }) {
    const navigate = useNavigate()

    const createUser = () => {
        postData('/user/create', {
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            password: user.password,
            birth: Number(user.birth),
            gender: user.gender,
        }).then((res) => {
            if (res.code === 200) {
                navigate('/signup/4', {
                    state: res.userId,
                })
            } else {
                // eslint-disable-next-line no-alert
                alert(res.error_message)
            }
        })
    }

    return (
        <>
            <div>
                <div>출생연도</div>
                <BirthSelect
                    name="birth"
                    onChange={(e) => {
                        handleChange(e)
                    }}
                >
                    <option key={111} value={undefined}>
                        --- 선택하기 ---
                    </option>
                    {[...Array(101)].map((_, index) => {
                        const year = new Date().getFullYear() - index
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        )
                    })}
                </BirthSelect>
            </div>
            <div>
                <div>성별</div>
                <GenderInput>
                    <div>
                        <LabelButton
                            htmlFor="male"
                            $isChecked={user.gender === 'male'}
                        >
                            남성
                        </LabelButton>
                        <input
                            type="radio"
                            id="male"
                            value="male"
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            name="gender"
                        />
                    </div>
                    <div>
                        <LabelButton
                            htmlFor="female"
                            $isChecked={user.gender === 'female'}
                        >
                            여성
                        </LabelButton>
                        <input
                            type="radio"
                            id="female"
                            value="female"
                            onChange={(e) => {
                                handleChange(e)
                            }}
                            name="gender"
                        />
                    </div>
                </GenderInput>
            </div>
            <Buttons>
                <LinkTo to="/signup/2">
                    <Pre />
                </LinkTo>
                <Button name="회원가입 하기" onClick={createUser} />
            </Buttons>
        </>
    )
}
