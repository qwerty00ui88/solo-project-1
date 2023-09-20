import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useGet, { Contents } from '../utils/useGet'
import ContentCard from '../components/ContentCard'

const ContentWrapper = styled.main``

const ContentList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 1.2rem;
`

function Content() {
    const { menu, category } = useParams()

    const { data } = useGet<Contents>(
        `https://api.themoviedb.org/3/${menu}/${category}`,
        { language: 'ko-KR' }
    )

    return (
        data && (
            <ContentWrapper>
                <ContentList>
                    {data.results.map((el) => {
                        return <ContentCard key={el.id} data={el} />
                    })}
                </ContentList>
            </ContentWrapper>
        )
    )
}

export default Content
