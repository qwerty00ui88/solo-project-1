import React from 'react'
import { styled } from 'styled-components'
import { xsmallSize } from '../style/font'
import { ReactComponent as Velog } from '../assets/velog.svg'
import { ReactComponent as GitHub } from '../assets/github.svg'
import { ReactComponent as Gmail } from '../assets/gmail.svg'

const FooterWrapper = styled.div`
    display: flex;
    color: #a5a5a7;
    padding: 50px 10vw;
    border-top: 1px solid #a5a5a7;
    @media screen and (max-width: 768px) {
        display: none;
    }
`

const FooterLeft = styled.div`
    flex: 1;
`

const FooterRight = styled.div`
    display: flex;
    flex-direction: column;
`

const FooterLeftUl = styled.ul`
    display: flex;

    & > li {
        margin: 0.1rem 0;
        white-space: nowrap;
        font-size: ${xsmallSize};
    }

    & > li:not(:last-child)::after {
        content: '|';
        margin: 0 0.5rem;
    }

    &:first-child,
    &:nth-child(5) {
        margin-bottom: 0.8rem;
    }
`

const FooterLinks = styled.ul`
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

function Footer() {
    const footerText = [
        { id: 1, list: ['서비스 이용약관', '개인정보 처리방침', '회사 안내'] },
        { id: 2, list: ['고객센터', 'cs@cut.co.kr · 010-1234-5678'] },
        {
            id: 3,
            list: ['광고 문의', 'ad_sales@cut.com · 최신 광고 소개서'],
        },
        { id: 4, list: ['제휴 및 대외 협력', 'https://cut.team/contact'] },
        {
            id: 5,
            list: [
                '주식회사 CUT',
                '대표 함소희',
                '서울특별시 서초구 강남대로 341 씨유티빌딩 9층',
            ],
        },
        { id: 6, list: ['사업자 등록 번호 212-78-89013'] },
        { id: 7, list: ['© 2023 by CUT, Inc. All rights reserved.'] },
    ]

    return (
        <FooterWrapper>
            <FooterLeft>
                {footerText.map((el) => {
                    return (
                        <FooterLeftUl key={el.id}>
                            {el.list.map((el2) => {
                                return <li key={el2[0]}>{el2}</li>
                            })}
                        </FooterLeftUl>
                    )
                })}
            </FooterLeft>
            <FooterRight>
                <FooterLinks>
                    <Gmail width="24" fill="#848485" />
                    <GitHub width="24" fill="#848485" />
                    <Velog width="24" fill="#848485" />
                </FooterLinks>
            </FooterRight>
        </FooterWrapper>
    )
}
export default Footer
