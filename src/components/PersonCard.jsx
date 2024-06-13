import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ReactComponent as Heart } from '../assets/heart.svg'

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

export default function PersonCard({ id, data, setRef = () => {} }) {
    return (
        data && (
            <PersonCardWrapper id={id} ref={setRef}>
                <Link to={`/detail/person/${data.id}`}>
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                        alt=""
                    />
                    <div>{data.name}</div>
                    <Popularity>
                        <Heart />
                        {data.popularity?.toFixed(1)}
                    </Popularity>
                </Link>
            </PersonCardWrapper>
        )
    )
}
