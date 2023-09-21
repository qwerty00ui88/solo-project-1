import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useGet, { MovieDetail, PersonDetail, TVDetail } from '../utils/useGet'
import Outline from '../components/Outline'
import Cast from '../components/Cast'
import PersonOutline from '../components/PersonOutline'

const DetailWrapper = styled.main``

function Detail() {
    const { media, id } = useParams() as { media: string; id: string }
    const { data } = useGet<MovieDetail | TVDetail | PersonDetail>(
        `https://api.themoviedb.org/3/${media}/${id}`,
        {
            append_to_response:
                media === 'person' ? 'combined_credits' : 'credits',
            language: 'us-EN',
        }
    )

    return (
        data && (
            <DetailWrapper>
                {media === 'person' ? (
                    <PersonOutline data={data as PersonDetail} />
                ) : (
                    <>
                        <Outline
                            media={media}
                            data={data as MovieDetail | TVDetail}
                        />
                        <Cast
                            credits={(data as MovieDetail | TVDetail).credits}
                        />
                    </>
                )}
            </DetailWrapper>
        )
    )
}

export default Detail
