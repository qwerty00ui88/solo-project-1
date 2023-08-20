import React from 'react'
import { styled } from 'styled-components'
import Carousel from './Carousel'

const Main = styled.main`
    margin: 0 24px;
`

const CarouselTemplate = styled.div`
    border: 1px solid;
    height: 500px;
`

function Template() {
    return (
        <Main>
            <CarouselTemplate>
                <Carousel />
            </CarouselTemplate>
        </Main>
    )
}

export default Template
