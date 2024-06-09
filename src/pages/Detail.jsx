import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import Outline from '../components/Outline'
import Cast from '../components/Cast'
import { xlargeSize } from '../style/font'
import Comment from '../components/Comment'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import { ReactComponent as NotRated } from '../assets/comment.svg'
import CommentModal from '../components/commons/CommentModal'

const DetailWrapper = styled.main`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
`

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

function Detail() {
    const serverUrl = process.env.REACT_APP_SERVER_URL
    const [responseData, setResponseData] = useState(null)
    const [isClick, setIsClick] = useState(false)

    const { mediaType, tmdbId } = useParams()

    // const NumberOfWorksData = {
    //     movie: (data as PersonDetail)?.combined_credits?.cast.filter((el) => {
    //         return el.media_type === 'movie'
    //     }).length,
    //     tv: (data as PersonDetail)?.combined_credits?.cast.filter((el) => {
    //         return el.media_type === 'tv'
    //     }).length,
    // }

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })

    const handleIsClick = () => {
        setIsClick(!isClick)
    }

    useEffect(() => {
        axios
            .get(`${serverUrl}/detail/${mediaType}/${tmdbId}`, {
                withCredentials: true,
            })
            .then((response) => {
                setResponseData(response.data)
            })
    }, [])

    return (
        responseData && (
            <>
                <DetailWrapper>
                    {mediaType === 'person' ? (
                        <>
                            <div />
                            {/* <PersonOutline data={data as PersonDetail} />
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
                            </div> */}
                        </>
                    ) : (
                        <>
                            <Outline
                                data={responseData.contentDetail}
                                recommendStatus={responseData.recommendStatus}
                                favorite={responseData.favorite}
                                myComment={responseData.myComment}
                                handleIsClick={handleIsClick}
                            />
                            <Cast
                                credits={responseData.contentDetail.credits}
                            />
                            <CommentSection>
                                <SubTitle>코멘트</SubTitle>

                                {/* 추천/비추천 리뷰 */}
                                <GoodBadComment>
                                    <div>
                                        <Good fill="#019e74" />
                                        {responseData?.goodCommentViewList?.map(
                                            (el) => {
                                                return (
                                                    <li key={el.comment.id}>
                                                        <Comment
                                                            id={el.userId}
                                                            nickname={
                                                                el.nickname
                                                            }
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
                                            (el) => {
                                                return (
                                                    <li key={el.comment.id}>
                                                        <Comment
                                                            id={el.userId}
                                                            nickname={
                                                                el.nickname
                                                            }
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
                                        (el) => {
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
                            </CommentSection>
                        </>
                    )}
                </DetailWrapper>
                {isClick && (
                    <CommentModal
                        handleClose={handleIsClick}
                        mediaType={mediaType}
                        tmdbId={tmdbId}
                        myComment={responseData.myComment}
                    />
                )}
            </>
        )
    )
}

export default Detail
