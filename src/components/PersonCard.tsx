import React from 'react'
import styled from 'styled-components'
import { PersonType } from '../utils/useGet'
import { ReactComponent as Heart } from '../assets/heart.svg'
import ContentCard from './ContentCard'

const PersonCardWrapper = styled.li`
    display: flex;
`

const Popularity = styled.div`
    display: flex;
    align-items: center;
`

const Image = styled.img`
    width: 200px;
    aspect-ratio: 2/3;
`

const KnownForList = styled.ul`
    display: flex;
`

function PersonCard({ data, rank }: { data: PersonType; rank: number }) {
    console.log(data)
    return (
        data && (
            <PersonCardWrapper>
                <div>{rank}</div>

                <div>
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                        alt=""
                    />
                    <div>{data.name}</div>
                    <Popularity>
                        <Heart />
                        {data.popularity.toFixed(1)}
                    </Popularity>
                </div>
                <KnownForList>
                    {data.known_for?.map((el) => {
                        return <ContentCard key={el.id} data={el} />
                    })}
                </KnownForList>
            </PersonCardWrapper>
        )
    )
}

export default PersonCard
