import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import axios from 'axios'
import { largeSize } from '../style/font'
import { Data } from './Carousel'
import { ReactComponent as Cancel } from '../assets/cancel.svg'

interface SearchBarWrapperTemplateProps {
    $isOpen: boolean
}

const SearchBarWrapper = styled.div<SearchBarWrapperTemplateProps>`
    position: relative;
    height: 100%;
    background-color: #14213d;
    border-radius: 30px;
    padding: ${(props) => (props.$isOpen ? `40px 100px` : `0`)};
`

const CancelButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
`

const Input = styled.input`
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    font-size: ${largeSize};
    color: #e5e5e5;
`

const Autocomplete = styled.ul`
    background-color: #e5e5e5;
    color: black;
`

interface SearchBarProps {
    isOpen: boolean
    handleSetIsOpen(): void
}

function SearchBar({ isOpen, handleSetIsOpen }: SearchBarProps) {
    const [data, setData] = useState<Data[]>([])
    const [word, setWord] = useState('')

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/multi',
        params: {
            query: `${word}`,
            include_adult: 'false',
            language: 'ko-KR',
            page: '1',
        },
        headers: {
            accept: 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTUyOWMwZTgyNzcxZTg2NzdkY2Q5ZGY1NDBlZTEyYyIsInN1YiI6IjY0ZTA5ODEyYTNiNWU2MDFkNTllNjA2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D9VKIXgwklDnixzscKkkoyBRJdQJsetwFke4bU9KiP0',
        },
    }

    const fetchData = async () => {
        try {
            const response = await axios.request(options)
            setData(response.data.results)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        }
    }

    const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
        handleSetIsOpen()
        e.stopPropagation()
    }

    useEffect(() => {
        fetchData()
    }, [word])

    return (
        <SearchBarWrapper $isOpen={isOpen}>
            {isOpen && (
                <CancelButton type="button" onClick={handleOnClick}>
                    <Cancel width={20} height={20} />
                </CancelButton>
            )}
            <div>
                <label htmlFor="search">
                    <Input
                        id="search"
                        placeholder="검색해보세요"
                        value={word}
                        onChange={(e) => {
                            setWord(e.target.value)
                        }}
                    />
                </label>
            </div>
            <Autocomplete>
                {data.map((el) => {
                    return <li key={el.id}>{el.title || el.name}</li>
                })}
            </Autocomplete>
        </SearchBarWrapper>
    )
}
export default SearchBar
