import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useGet, { ContentDetail } from '../utils/useGet'
import Outline from '../components/Outline'

const DetailWrapper = styled.main``

function Detail() {
    const { id } = useParams()
    const { data } = useGet<ContentDetail>(
        `https://api.themoviedb.org/3/movie/${id}`,
        { language: 'ko-KR' }
    ) as { data: ContentDetail }

    return (
        <DetailWrapper>
            <Outline data={data} />
        </DetailWrapper>
    )
}

export default Detail
