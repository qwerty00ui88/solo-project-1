import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useGet, { MovieDetail, PersonDetail, TVDetail } from '../utils/useGet'
import Outline from '../components/Outline'
import Cast from '../components/Cast'
import PersonOutline from '../components/PersonOutline'
import Credits from '../components/Credits'
import Biography from '../components/Biography'
import NumberOfWorks from '../components/NumberOfWorks'
import { xlargeSize } from '../style/font'

const DetailWrapper = styled.main`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
`

const CreditsList = styled.ul``

const SubTitle = styled.h3`
    font-size: ${xlargeSize};
`

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

    const creditListEl = (data as PersonDetail)?.combined_credits?.cast
        .slice()
        .sort((a, b) => {
            const dateB = (b.release_date || b.first_air_date) as string
            const dateA = (a.release_date || a.first_air_date) as string

            if (!dateA && dateB) return -1
            if (dateA && !dateB) return 1
            if (!dateA && !dateB) return -1

            return new Date(dateB).getTime() - new Date(dateA).getTime()
        })

    const NumberOfWorksData = {
        movie: (data as PersonDetail)?.combined_credits?.cast.filter((el) => {
            return el.media_type === 'movie'
        }).length,
        tv: (data as PersonDetail)?.combined_credits?.cast.filter((el) => {
            return el.media_type === 'tv'
        }).length,
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })

    return (
        data && (
            <DetailWrapper>
                {media === 'person' ? (
                    <>
                        <PersonOutline data={data as PersonDetail} />
                        <Biography data={(data as PersonDetail).biography} />
                        <div>
                            <SubTitle>출연</SubTitle>
                            <NumberOfWorks data={NumberOfWorksData} />
                            <CreditsList>
                                {creditListEl?.map((el) => {
                                    return (
                                        <Credits
                                            key={`${el.id}${Math.random()}`}
                                            data={el}
                                        />
                                    )
                                })}
                            </CreditsList>
                        </div>
                    </>
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
