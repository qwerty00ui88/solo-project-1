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
import Button from '../components/commons/Button'
import Comment from '../components/Comment'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import { ReactComponent as NotRated } from '../assets/comment.svg'

const DetailWrapper = styled.main`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
`

const CreditsList = styled.ul``

const SubTitle = styled.h3`
    font-size: ${xlargeSize};
`

const CommentSection = styled.section``

const CommentTextarea = styled.div`
    display: flex;
    flex-direction: column;
`

const CommentButton = styled.div`
    display: flex;
    justify-content: end;
`

const GoodBadComment = styled.div`
    display: flex;
    justify-content: space-between;
    > div {
        width: 48.5%;
    }
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
                <CommentSection>
                    <SubTitle>코멘트</SubTitle>

                    {/* 코멘트 작성 */}
                    <CommentTextarea>
                        <textarea />
                        <CommentButton>
                            <div>
                                <Button name="저장" onClick={() => {}} />
                            </div>
                            <div>
                                <Button name="수정" onClick={() => {}} />
                                <Button name="삭제" onClick={() => {}} />
                            </div>
                        </CommentButton>
                    </CommentTextarea>

                    {/* 추천/비추천 리뷰 */}
                    <GoodBadComment>
                        <div>
                            <Good />
                            {[1, 2, 3].map((el) => {
                                return (
                                    <li key={el}>
                                        <Comment />
                                    </li>
                                )
                            })}
                        </div>
                        <div>
                            <Bad />
                            {[1, 2, 3].map((el) => {
                                return (
                                    <li key={el}>
                                        <Comment />
                                    </li>
                                )
                            })}
                        </div>
                    </GoodBadComment>

                    {/* 미평가 리뷰 */}
                    <div>
                        <NotRated />
                        {[1, 2, 3].map((el) => {
                            return (
                                <li key={el}>
                                    <Comment />
                                </li>
                            )
                        })}
                    </div>
                </CommentSection>
            </DetailWrapper>
        )
    )
}

export default Detail
