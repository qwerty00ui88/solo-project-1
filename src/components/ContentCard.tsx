import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { xlargeRadius } from '../style/border'
import { boldWeight, largeSize } from '../style/font'
import { ReactComponent as Star } from '../assets/star.svg'
import { Content } from '../types/content'

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

function ContentCard({
    data,
    setRef = () => {},
}: {
    data: Content
    mediaType: string
    setRef?: (node: HTMLLIElement) => void
}) {
    console.log(data)
    return (
        data && (
            <ContentCardWrapper id={data.id} ref={setRef}>
                <Link to={`/detail/${data.mediaType}/${data.tmdbId}`}>
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${data.posterPath}`}
                        alt=""
                    />
                    <Description>
                        <Title>{data.title}</Title>
                        <div>{data.release_date || data.first_air_date}</div>
                        <Vote>
                            <Star />
                            {data.vote_average?.toFixed(1)}
                        </Vote>
                    </Description>
                </Link>
            </ContentCardWrapper>
        )
    )
}

export default ContentCard
