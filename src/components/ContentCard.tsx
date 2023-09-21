import React from 'react'
import { styled } from 'styled-components'
import { xlargeRadius } from '../style/border'
import { ContentType } from '../utils/useGet'
import { boldWeight, largeSize } from '../style/font'
import { ReactComponent as Star } from '../assets/star.svg'

const ContentCardWrapper = styled.li`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 15rem;
    aspect-ratio: 2/3;
    border-radius: ${xlargeRadius};
    box-shadow:
        0 1px 1px rgba(0, 0, 0, 0.1),
        0 2px 2px rgba(0, 0, 0, 0.1),
        0 4px 4px rgba(0, 0, 0, 0.1),
        0 8px 8px rgba(0, 0, 0, 0.1),
        0 16px 16px rgba(0, 0, 0, 0.1);
`

const Image = styled.img`
    width: 100%;
    aspect-ratio: 2/3;
    border-radius: ${xlargeRadius};
`

const Description = styled.div`
    flex: 1;
    padding: 15px 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 0 0 ${xlargeRadius} ${xlargeRadius};
    background-image: linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 1)
    );
    /* background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)); */
`

const Title = styled.div`
    font-size: ${largeSize};
    font-weight: ${boldWeight};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Vote = styled.div`
    display: flex;
    align-items: center;
`

function ContentCard({ data }: { data: ContentType }) {
    console.log(data)
    return (
        data && (
            <ContentCardWrapper>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt="fds"
                />
                <Description>
                    <Title>{data.title || data.name}</Title>
                    <div>{data.release_date || data.first_air_date}</div>
                    <Vote>
                        <Star />
                        {data.vote_average?.toFixed(1)}
                    </Vote>
                </Description>
            </ContentCardWrapper>
        )
    )
}

export default ContentCard
