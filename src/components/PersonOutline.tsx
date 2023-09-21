import React from 'react'
import styled from 'styled-components'
import { PersonDetail } from '../utils/useGet'

const PersonOutlineWrapper = styled.div`
    display: flex;
`

const Left = styled.div``

const Right = styled.div``

function PersonOutline({ data }: { data: PersonDetail }) {
    return (
        <PersonOutlineWrapper>
            <Left>
                <img
                    src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                    alt=""
                />
            </Left>
            <Right>
                <div>{data.name}</div>
                <div>{data.biography}</div>
            </Right>
        </PersonOutlineWrapper>
    )
}

export default PersonOutline
