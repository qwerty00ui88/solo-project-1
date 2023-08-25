import React from 'react'
import { styled } from 'styled-components'
import Carousel from './Carousel'
import SearchBar from './SearchBar'

const Main = styled.main`
    margin: 0 24px;
    & > * {
        border: 1px solid;
    }
`

const HeaderTemplate = styled.div`
    height: 15vh;
`

const CarouselTemplate = styled.div`
    height: 73vh;
`

const UtilityBarTemplate = styled.div`
    display: flex;
    height: 6vh;
    // searchbar expand 시 활성화
    /* height: 36vh; */
`

const SearchBarTemplate = styled.div`
    flex: 1 1 70%;
    height: 100%;
    border: 1px solid green;
`

const FloatingBarTemplate = styled.div`
    border: 1px solid red;
    flex: 0 0 30%;
    width: 6vh;
    height: 6vh;
    // 스크롤 아래 시 활성화
    /* position: fixed;
    right: 24px;
    top: 88vh; */
`

function Template() {
    return (
        <Main>
            <HeaderTemplate>
                <div>Header입니다</div>
            </HeaderTemplate>
            <CarouselTemplate>
                <Carousel />
            </CarouselTemplate>
            <UtilityBarTemplate>
                <SearchBarTemplate>
                    <SearchBar />
                </SearchBarTemplate>
                <FloatingBarTemplate>
                    <SearchBar />
                </FloatingBarTemplate>
            </UtilityBarTemplate>
        </Main>
    )
}

export default Template
