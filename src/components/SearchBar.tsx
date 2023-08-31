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

const SearchGuide = styled.div`
    height: 6vh;
    line-height: 6vh;
    margin-left: 25px;
    color: #e5e5e5;
`

const CancelButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
`

const InputContainer = styled.div`
    margin-bottom: 15px;
    & input {
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
        font-size: ${largeSize};
        color: #e5e5e5;
        padding-bottom: 10px;
    }
`

const Autocomplete = styled.ul`
    position: absolute;
    background-color: #e5e5e5;
    color: black;
`

const GenrePanel = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    & > li {
        width: fit-content;
        border: 1px solid #e5e5e5;
        color: #e5e5e5;
        border-radius: 20px;
        padding: 5px 10px;
    }
`

interface Genre {
    id: number
    name: string
}

interface SearchBarProps {
    isOpen: boolean
    handleSetIsOpen(): void
}

function SearchBar({ isOpen, handleSetIsOpen }: SearchBarProps) {
    const [data, setData] = useState<Data[]>([])
    const [word, setWord] = useState('')
    const [genre, setGenre] = useState<string[]>([])

    const fetchData = async () => {
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

    const fetchGenre = async () => {
        const media = ['movie', 'tv']
        const genres: Set<string> = new Set()
        const fetchPromises = media.map(async (m) => {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/genre/${m}/list`,
                params: { language: 'ko' },
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTUyOWMwZTgyNzcxZTg2NzdkY2Q5ZGY1NDBlZTEyYyIsInN1YiI6IjY0ZTA5ODEyYTNiNWU2MDFkNTllNjA2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D9VKIXgwklDnixzscKkkoyBRJdQJsetwFke4bU9KiP0',
                },
            }

            try {
                const response = await axios.request(options)
                const SetAddPromises = response.data.genres.map(
                    async (value: Genre) => {
                        return genres.add(value.name)
                    }
                )
                await Promise.all(SetAddPromises)
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error)
            }
        })
        await Promise.all(fetchPromises)
        setGenre(Array.from(genres))
    }

    useEffect(() => {
        fetchData()
    }, [word])

    useEffect(() => {
        fetchGenre()
    }, [])

    return (
        <SearchBarWrapper $isOpen={isOpen}>
            {isOpen ? (
                <>
                    <CancelButton type="button" onClick={handleOnClick}>
                        <Cancel width={20} height={20} />
                    </CancelButton>

                    <InputContainer>
                        <label htmlFor="search">
                            <input
                                id="search"
                                placeholder="검색해보세요"
                                value={word}
                                onChange={(e) => {
                                    setWord(e.target.value)
                                }}
                            />
                        </label>
                    </InputContainer>

                    <Autocomplete>
                        {data.map((d) => {
                            return <li key={d.id}>{d.title || d.name}</li>
                        })}
                    </Autocomplete>
                    <GenrePanel>
                        {genre.map((g: string) => {
                            return <li key={g}>{g}</li>
                        })}
                    </GenrePanel>
                </>
            ) : (
                <SearchGuide>원하는 영화, 드라마를 검색해보세요</SearchGuide>
            )}
        </SearchBarWrapper>
    )
}
export default SearchBar
