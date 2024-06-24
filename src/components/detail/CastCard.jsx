import React from 'react'
import styled from 'styled-components'
import { boldWeight } from '../../style/font'

const PersonCardWrapper = styled.li`
    display: flex;
    border: 2px solid #e5e5e53f;
    border-radius: 15px;
    background-color: black;
    width: 24%;
    overflow: hidden;
`

const Profile = styled.img`
    width: 45px;
    aspect-ratio: 2/3;
    margin-right: 1rem;
`

const NameAndCharacter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Name = styled.div`
    font-weight: ${boldWeight};
`

export default function CastCard({ personData }) {
    return (
        <PersonCardWrapper>
            <Profile
                src={`https://image.tmdb.org/t/p/w92${personData.profile_path}`}
                alt=""
            />
            <NameAndCharacter>
                <Name>{personData.name}</Name>
                <div>{`${personData.character}역`}</div>
            </NameAndCharacter>
        </PersonCardWrapper>
    )
}
