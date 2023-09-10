import React from 'react'
import { styled } from 'styled-components'
import { xlargeRadius } from '../style/border'
import { ContentType } from '../utils/useGet'

const ContentCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 33%;
    height: 100%;
    border-radius: ${xlargeRadius};
    overflow: hidden;
`

const Description = styled.div`
    flex: 1;
    background-color: #e5e5e5;
    & > * {
        color: black;
    }
`

const Image = styled.img`
    width: 100%;
`

function ContentCard({ data }: { data: ContentType }) {
    return (
        <ContentCardWrapper>
            <Image
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt="fds"
            />
            <Description>
                <div>{data.title || data.name}</div>
                <div>{data.release_date || data.first_air_date}</div>
                <div>{data.vote_average.toFixed(1)}</div>
            </Description>
        </ContentCardWrapper>
    )
}

export default ContentCard
