import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useGet, {
    ContentType,
    Contents,
    People,
    PersonType,
} from '../utils/useGet'
import ContentCard from '../components/ContentCard'
import PersonCard from '../components/PersonCard'

const ContentWrapper = styled.main``

const ContentList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 1.2rem;
`

const PeopleList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 1.2rem;
`

function Content() {
    const { menu, category } = useParams() as { menu: string; category: string }

    const { data } = useGet<Contents | People>(
        `https://api.themoviedb.org/3/${menu}/${category}`,
        { language: 'ko-KR' },
        [menu, category]
    )

    return (
        data && (
            <ContentWrapper>
                {menu === 'person' && (
                    <PeopleList>
                        {data.results.map((el, idx) => {
                            return (
                                <PersonCard
                                    key={el.id}
                                    data={el as PersonType}
                                    rank={idx + 1}
                                />
                            )
                        })}
                    </PeopleList>
                )}
                {(menu === 'movie' || menu === 'tv') && (
                    <ContentList>
                        {data.results.map((el) => {
                            return (
                                <ContentCard
                                    key={el.id}
                                    data={el as ContentType}
                                />
                            )
                        })}
                    </ContentList>
                )}
            </ContentWrapper>
        )
    )
}

export default Content
