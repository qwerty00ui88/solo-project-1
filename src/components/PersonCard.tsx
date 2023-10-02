import React from 'react'
import styled from 'styled-components'
import { PersonType } from '../utils/useGet'
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

function PersonCard({
    id,
    data,
    setRef,
}: {
    id: string
    data: PersonType
    setRef: (node: HTMLLIElement) => void
}) {
    return (
        data && (
            <PersonCardWrapper id={id} ref={setRef}>
                <div>
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                        alt=""
                    />
                    <div>{data.name}</div>
                    <Popularity>
                        <Heart />
                        {data.popularity?.toFixed(1)}
                    </Popularity>
                </div>
            </PersonCardWrapper>
        )
    )
}

export default PersonCard
