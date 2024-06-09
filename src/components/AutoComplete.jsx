import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { largeRadius } from '../style/border'

const AutoCompleteWrapper = styled.ul`
    position: absolute;
    width: 40%;
    background-color: black;
    margin-top: -0.7rem;
    border-radius: ${largeRadius};
    padding: 1rem 0;
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);

    & a {
        display: block;
        width: 100%;
    }
`

const Li = styled.li`
    padding: 0.2rem 1rem;
    background-color: ${(props) =>
        props.$isFocused ? 'rgb(229, 9, 20)' : `black`};

    &:hover {
        background-color: 'red';
    }
`

function AutoComplete({ data, autoCompleteVisible }) {
    const ref = useRef(null)
    const navigate = useNavigate()
    const [focusedIndex, setFocusedIndex] = useState(0)
    const [pressEnter, setPressEnter] = useState(false)

    if (autoCompleteVisible) {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowDown':
                    setFocusedIndex(focusedIndex + 1)
                    break
                case 'ArrowUp':
                    setFocusedIndex(focusedIndex - 1)
                    break
                case 'Enter':
                    setPressEnter(true)
                    break
                default:
            }
        })
    }

    useEffect(() => {
        if (pressEnter) {
            navigate(`/search/${data[focusedIndex]?.title}`)
            setPressEnter(false)
        }
    }, [pressEnter])

    return (
        <AutoCompleteWrapper ref={ref}>
            {data.map((d, index) => {
                return (
                    <Li key={d.id} $isFocused={index === focusedIndex}>
                        <Link to={`/search/${d?.title}`}>{d?.title}</Link>
                    </Li>
                )
            })}
        </AutoCompleteWrapper>
    )
}

export default AutoComplete
