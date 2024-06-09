import React from 'react'
import styled from 'styled-components'
import { titleWeb, xlargeSize } from '../style/font'
import { ReactComponent as Heart } from '../assets/heart.svg'
import { ReactComponent as HomePage } from '../assets/homepage.svg'

const PersonOutlineWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    column-gap: 3rem;
`

const Left = styled.img`
    width: 300px;
    aspect-ratio: 2/3;
`

const Right = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h2`
    font-size: ${titleWeb};
`

const SubTitle = styled.h3`
    font-size: ${xlargeSize};
`

const AlsoKnownAs = styled.div``

const AlsoKnownAsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    & > li:not(:last-child)::after {
        content: ' · ';
    }
`

const DayAndGender = styled.div`
    display: flex;
    column-gap: 1rem;
`

const Popularity = styled.div`
    display: flex;
    align-items: center;
`

const Day = styled.div`
    display: flex;
`

const HomePageLink = styled.a`
    width: fit-content;
`

function PersonOutline({ data }) {
    const gender = ['Not set / not specified', 'Female', 'Male', 'Non-binary']

    return (
        <PersonOutlineWrapper>
            <Left
                src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                alt=""
            />
            <Right>
                <Title>{data.name}</Title>
                <DayAndGender>
                    <Day>
                        <div>{data.birthday}</div>
                        {data.deathday && <div>{`~${data.deathday}`}</div>}
                    </Day>
                    <div>{gender[data.gender]}</div>
                    <Popularity>
                        <Heart />
                        {data.popularity.toFixed(1)}
                    </Popularity>
                </DayAndGender>
                <AlsoKnownAs>
                    {data.also_known_as?.length > 0 && (
                        <>
                            <SubTitle>Also Known As</SubTitle>
                            <AlsoKnownAsList>
                                {data.also_known_as?.map((el) => {
                                    return <li key={el}>{el}</li>
                                })}
                            </AlsoKnownAsList>
                        </>
                    )}
                </AlsoKnownAs>
                {data.homepage && (
                    <HomePageLink
                        href={data.homepage}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <HomePage width="20px" />
                    </HomePageLink>
                )}
            </Right>
        </PersonOutlineWrapper>
    )
}

export default PersonOutline
