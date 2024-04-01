import React from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactComponent as Star } from '../assets/star.svg'
import { ReactComponent as Heart } from '../assets/heart.svg'
import { xlargeSize } from '../style/font'
import { smallRadius } from '../style/border'
import { PersonType } from '../utils/useGet'
import { Category } from './Trending'
import { MovieType, TVType } from './MyFavorite'

const ChartWrapper = styled.div<{ $backdrop: string | undefined }>`
    display: flex;
    align-items: center;
    background: ${(props) =>
        `no-repeat center url(https://image.tmdb.org/t/p/w780${props.$backdrop})`};
    background-color: rgba(0, 0, 0, 0.83);
    background-blend-mode: overlay;
    border-radius: ${smallRadius};
    & > svg {
        margin-right: 5px;
    }
`

const Rank = styled.div`
    width: 40px;
    text-align: center;
    font-size: ${xlargeSize};
`

export const Poster = styled.img`
    width: 60px;
    aspect-ratio: 2/3;
    margin-right: 20px;
`

const Title = styled(Link)`
    flex: 1;
`

const VoteAvg = styled.div`
    margin-right: 20px;
`
interface RankItemProps {
    category: Category
    data: MovieType | TVType | PersonType
    rank: number
}

function RankItem({ category, data, rank }: RankItemProps) {
    const imagePath =
        (data as MovieType | TVType).poster_path ||
        (data as PersonType).profile_path
    const backdropPath = (data as MovieType | TVType).backdrop_path
    const title =
        (data as MovieType).title ||
        (data as TVType).name ||
        (data as PersonType).name
    const vote = (
        (data as MovieType | TVType).vote_average ||
        (data as PersonType).popularity
    ).toFixed(1)

    return (
        <ChartWrapper $backdrop={backdropPath}>
            <Rank>{rank}</Rank>
            <Poster src={`https://image.tmdb.org/t/p/w92${imagePath}`} alt="" />
            <Title to={`/detail/${data.media_type}/${data.id}`}>{title}</Title>
            {category === 'person' ? <Heart /> : <Star />}
            <VoteAvg>{vote}</VoteAvg>
        </ChartWrapper>
    )
}

export default RankItem
