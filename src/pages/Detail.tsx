import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import useGet, { MovieDetail, PersonDetail, TVDetail } from '../utils/useGet'
import Outline from '../components/Outline'
import Cast from '../components/Cast'
import PersonOutline from '../components/PersonOutline'
import Credits from '../components/Credits'
import Biography from '../components/Biography'
import NumberOfWorks from '../components/NumberOfWorks'
import { xlargeSize } from '../style/font'
import Comment from '../components/Comment'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import { ReactComponent as NotRated } from '../assets/comment.svg'
import CommentModal from '../components/commons/CommentModal'

export interface CommentType {
    userId: number
    nickname: string
    comment: Comment
}

export interface Comment {
    contentId: number
    createdAt: string
    id: number
    text: string
    updatedAt: string
    userId: number
}

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

const GoodBadComment = styled.div`
    display: flex;
    justify-content: space-between;
    > div {
        width: 48.5%;
    }
`

export interface ResponseDataType {
    recommendStatus: null | 'good' | 'bad'
    favorite: boolean
    goodCommentViewList: []
    badCommentViewList: []
    unratedCommentViewList: []
    myComment: Comment
}

function Detail() {
    const [responseData, setResponseData] = useState<null | ResponseDataType>(
        null
    )
    const [isClick, setIsClick] = useState(false)

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

    // window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth',
    // })

    const handleIsClick = () => {
        setIsClick(!isClick)
    }

    useEffect(() => {
        axios
            .get('http://localhost/detail', {
                params: {
                    mediaType: media,
                    tmdbId: Number(id),
                },
                withCredentials: true,
            })
            .then((response) => {
                setResponseData(response.data)
                // eslint-disable-next-line no-console
                console.log(response.data)
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error)
            })
    }, [])

    return (
        data &&
        responseData && (
            <>
                <DetailWrapper>
                    {media === 'person' ? (
                        <>
                            <PersonOutline data={data as PersonDetail} />
                            <Biography
                                data={(data as PersonDetail).biography}
                            />
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
                                recommendStatus={responseData.recommendStatus}
                                favorite={responseData.favorite}
                                myComment={responseData.myComment}
                                handleIsClick={handleIsClick}
                            />
                            <Cast
                                credits={
                                    (data as MovieDetail | TVDetail).credits
                                }
                            />
                        </>
                    )}
                    <CommentSection>
                        <SubTitle>코멘트</SubTitle>

                        {/* 추천/비추천 리뷰 */}
                        <GoodBadComment>
                            <div>
                                <Good fill="#019e74" />
                                {responseData?.goodCommentViewList?.map(
                                    (el: CommentType) => {
                                        return (
                                            <li key={el.comment.id}>
                                                <Comment
                                                    id={el.userId}
                                                    nickname={el.nickname}
                                                    commentText={
                                                        el.comment.text
                                                    }
                                                />
                                            </li>
                                        )
                                    }
                                )}
                            </div>
                            <div>
                                <Bad fill="rgb(229, 9, 20)" />
                                {responseData?.badCommentViewList?.map(
                                    (el: CommentType) => {
                                        return (
                                            <li key={el.comment.id}>
                                                <Comment
                                                    id={el.userId}
                                                    nickname={el.nickname}
                                                    commentText={
                                                        el.comment.text
                                                    }
                                                />
                                            </li>
                                        )
                                    }
                                )}
                            </div>
                        </GoodBadComment>

                        {/* 미평가 리뷰 */}
                        <div>
                            <NotRated />
                            {responseData?.unratedCommentViewList?.map(
                                (el: CommentType) => {
                                    return (
                                        <li key={el.comment.id}>
                                            <Comment
                                                id={el.userId}
                                                nickname={el.nickname}
                                                commentText={el.comment.text}
                                            />
                                        </li>
                                    )
                                }
                            )}
                        </div>
                    </CommentSection>
                </DetailWrapper>
                {isClick && (
                    <CommentModal
                        handleClose={handleIsClick}
                        mediaType={media}
                        tmdbId={id}
                        myComment={responseData.myComment}
                    />
                )}
            </>
        )
    )
}

export default Detail
