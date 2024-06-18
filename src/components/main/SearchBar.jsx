import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { xxlargeSize } from '../../style/font'
import { ReactComponent as Cancel } from '../../assets/cancel.svg'
import { ReactComponent as SearchIcon } from '../../assets/search.svg'
import { xlargeRadius } from '../../style/border'

const SearchBarWrapper = styled.div`
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

export const CancelButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
`

const SearchInput = styled.input`
    margin: 0 1rem 1rem 0;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 0.7rem;
    font-size: ${xxlargeSize};
    &::placeholder {
        color: #e5e5e53f;
    }
`

const Form = styled.form`
    display: flex;
`

export default function SearchBar({ isOpen, handleSetIsOpen }) {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const navigate = useNavigate()
    const [text, setText] = useState('')
    // const [autoCompleteVisible, setAutoCompleteVisible] = useState(false)

    const handleCancelButton = () => {
        handleSetIsOpen()
        setText('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .get(`${serverUrl}/search`, {
                withCredentials: true,
                params: {
                    query: text,
                    page: 1,
                },
            })
            .then((response) => {
                navigate(`/search/${text}`, { state: response.data })
            })
    }

    // useEffect(() => {
    //     if (result?.length > 0) {
    //         setAutoCompleteVisible(true)
    //     } else {
    //         setAutoCompleteVisible(false)
    //     }
    // }, [data])

    return (
        <SearchBarWrapper
            onClick={() => {
                if (!isOpen) handleSetIsOpen()
            }}
            $isOpen={isOpen}
        >
            {isOpen ? (
                <>
                    <CancelButton type="button" onClick={handleCancelButton}>
                        <Cancel />
                    </CancelButton>
                    <Form onSubmit={handleSubmit}>
                        <SearchInput
                            type="text"
                            placeholder="검색해보세요"
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                            }}
                        />
                        <button type="submit" aria-label="search">
                            <SearchIcon />
                        </button>
                    </Form>
                    {/* {autoCompleteVisible && (
                        <AutoComplete
                            data={result}
                            autoCompleteVisible={autoCompleteVisible}
                        />
                    )} */}
                </>
            ) : (
                <div>원하는 영화, 드라마를 검색해보세요</div>
            )}
        </SearchBarWrapper>
    )
}
