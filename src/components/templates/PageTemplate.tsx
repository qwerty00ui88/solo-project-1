import React, { ReactNode } from 'react'
import { styled } from 'styled-components'
import Header from '../Header'
import Footer from '../Footer'

const HeaderTemplate = styled.header`
    height: 15vh;
    max-height: 120px;
`
const MainTemplate = styled.main`
    margin: 0 10vw;
    &::after {
        content: '';
        display: block;
        height: 15vh;
        max-height: 120px;
    }
    @media screen and (max-width: 768px) {
        margin: 0 4vw;
    }
    @media screen and (max-width: 375px) {
        margin: 0 3vw;
    }
`
const FooterTemplate = styled.footer`
    padding: 50px 10vw;
    @media screen and (max-width: 768px) {
        display: none;
    }
`

function PageTemplate({ children }: { children: ReactNode }) {
    return (
        <>
            <HeaderTemplate>
                <Header />
            </HeaderTemplate>
            <MainTemplate>{children}</MainTemplate>
            <FooterTemplate>
                <Footer />
            </FooterTemplate>
        </>
    )
}

export default PageTemplate
