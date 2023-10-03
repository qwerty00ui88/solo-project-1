import React, { ChangeEvent, useState } from 'react'
import { styled } from 'styled-components'
import { xxlargeSize } from '../style/font'
import { ReactComponent as Cancel } from '../assets/cancel.svg'
import useGet, { Genre, Contents } from '../utils/useGet'
import { largeRadius, xlargeRadius } from '../style/border'

const SearchBarWrapper = styled.div<{ $isOpen: boolean }>`
    flex: 1 1 70%;
    z-index: 2;
    display: ${(props) => (props.$isOpen ? 'block' : `flex`)};
    align-items: ${(props) => (props.$isOpen ? null : `center`)};
    position: relative;
    height: 100%;
    background: #833ab4; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right,
        #fcb045b0,
        #fd1d1db0,
        #833ab4b0
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to right,
        #fcb045b0,
        #fd1d1db0,
        #833ab4b0
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    border-radius: ${xlargeRadius};
    padding: ${(props) => (props.$isOpen ? '48px 6vw' : `0`)};

    & > div {
        padding-left: ${(props) => (props.$isOpen ? null : `25px`)};
    }
`

const CancelButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
`

const InputContainer = styled.div`
    & input {
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
        font-size: ${xxlargeSize};
        padding-bottom: 10px;
        &::placeholder {
            color: #e5e5e53f;
        }
    }
`

const Autocomplete = styled.ul`
    position: absolute;
    width: 40%;
    background-color: black;
    margin-top: -15px;
    border-radius: ${largeRadius};
    padding: 10px;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
`

const GenrePanel = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    & > li {
        width: fit-content;
        border: 1px solid #e5e5e5;
        border-radius: ${xlargeRadius};
        padding: 5px 10px;
    }
`

interface SearchBarProps {
    isOpen: boolean
    handleSetIsOpen(): void
}

function SearchBar({ isOpen, handleSetIsOpen }: SearchBarProps) {
    const [word, setWord] = useState('')
    const { data } = useGet<Contents>(
        'https://api.themoviedb.org/3/search/multi',
        {
            query: `${word}`,
            include_adult: false,
            language: 'ko-KR',
            page: 1,
        },
        [word]
    )

    const result = (data as Contents)?.results

    const { data: genres } = useGet(
        `https://api.themoviedb.org/3/genre/movie/list`,
        {
            language: 'ko',
        }
    ) as { data: { genres: Genre[] } }

    const changeSearchWord = (e: ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value)
    }

    return (
        <SearchBarWrapper
            onClick={() => {
                if (!isOpen) handleSetIsOpen()
            }}
            $isOpen={isOpen}
        >
            {isOpen ? (
                <>
                    <CancelButton type="button" onClick={handleSetIsOpen}>
                        <Cancel width={20} height={20} />
                    </CancelButton>
                    <InputContainer>
                        <label htmlFor="search">
                            <input
                                id="search"
                                placeholder="검색해보세요"
                                value={word}
                                onChange={changeSearchWord}
                            />
                        </label>
                    </InputContainer>
                    {result.length > 0 && (
                        <Autocomplete>
                            {result.map((d) => {
                                return <li key={d.id}>{d.name || d.title}</li>
                            })}
                        </Autocomplete>
                    )}
                    <GenrePanel>
                        {genres.genres.length > 0 &&
                            genres.genres.map((g: Genre) => {
                                return <li key={g.id}>{g.name}</li>
                            })}
                    </GenrePanel>
                </>
            ) : (
                <div>원하는 영화, 드라마를 검색해보세요</div>
            )}
        </SearchBarWrapper>
    )
}
export default SearchBar
