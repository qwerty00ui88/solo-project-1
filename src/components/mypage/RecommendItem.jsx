import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Good } from '../../assets/good.svg'
import { ReactComponent as Bad } from '../../assets/bad.svg'
import Poster from '../commons/Poster'
import { CommentWrapper, Text } from '../detail/CommentItem'

export const PosterSection = styled.div`
    width: 10%;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const TitleSection = styled.div`
    text-align: center;
    flex: 1 1;
`

const RecommendSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: end;
    width: 15%;
`

const CommentSection = styled(CommentWrapper)`
    margin: 0.5rem 0 1.5rem;
`

export default function RecommendItem({ item }) {
    return (
        <>
            <Top>
                <PosterSection>
                    <Poster data={item.contentEntity} width="60px" />
                </PosterSection>
                <TitleSection>{item.contentEntity.title}</TitleSection>
                <RecommendSection>
                    {item.recommend && (
                        <>
                            <div>{item.recommend.updatedAt.slice(0, 10)}</div>
                            {item.recommend.status === 'good' ? (
                                <Good fill="#019e74" />
                            ) : (
                                <Bad fill="rgb(229, 9, 20)" />
                            )}
                        </>
                    )}
                </RecommendSection>
            </Top>
            {item.comment && (
                <CommentSection>
                    <Text>{item.comment.text}</Text>
                </CommentSection>
            )}
        </>
    )
}
