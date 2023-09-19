import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useGet, { MovieDetail, TVDetail } from '../utils/useGet'
import Outline from '../components/Outline'
import Cast from '../components/\bCast'

const DetailWrapper = styled.main``

function Detail() {
    const { media, id } = useParams() as { media: string; id: string }
    const { data } = useGet<MovieDetail | TVDetail>(
        `https://api.themoviedb.org/3/${media}/${id}?append_to_response=credits`,
        {
            language: 'ko-KR',
        }
    ) as { data: MovieDetail | TVDetail }

    return (
        data && (
            <DetailWrapper>
                <Outline media={media} data={data} />
                <Cast credits={data.credits} />
            </DetailWrapper>
        )
    )
}

export default Detail
