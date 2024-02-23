import React from 'react'
import styled from 'styled-components'
import { MovieType, TVType } from './MyFavorite'
import { RecommendItemType } from './MyRecommend'
import { ReactComponent as Good } from '../assets/good.svg'
import { ReactComponent as Bad } from '../assets/bad.svg'
import Poster from './commons/Poster'

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

function RecommendItem({ item }: { item: RecommendItemType }) {
    return (
        <>
            <Top>
                <PosterSection>
                    <Poster
                        mediaType={item.contentDetail.mediaType}
                        id={item.contentDetail.id}
                        posterPath={item?.contentDetail.poster_path}
                    />
                </PosterSection>
                <TitleSection>
                    {(item.contentDetail as MovieType).title ||
                        (item.contentDetail as TVType).name}
                </TitleSection>
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
            {item.comment && <div>{item.comment.text}</div>}
        </>
    )
}
export default RecommendItem
