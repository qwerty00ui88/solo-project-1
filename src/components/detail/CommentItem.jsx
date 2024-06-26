import React from 'react'
import styled from 'styled-components'
import { smallRadius } from '../../style/border'
import { ReactComponent as Good } from '../../assets/good.svg'
import { ReactComponent as Bad } from '../../assets/bad.svg'
import { boldWeight } from '../../style/font'

const CommentWrapper = styled.li`
    background-color: #e5e5e5;
    border-radius: ${smallRadius};
    padding: 0.5rem;
    height: fit-content;
`

const NicknameAndRecommend = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Nickname = styled.div`
    font-weight: ${boldWeight};
    color: black;
`

const Text = styled.div`
    color: black;
    white-space: pre-wrap;
    word-break: break-all;
`

export default function CommentItem({
    id,
    nickname,
    commentText,
    recommendStatus,
}) {
    return (
        <CommentWrapper id={id}>
            <NicknameAndRecommend>
                <Nickname>{nickname}</Nickname>
                {recommendStatus === 'good' && (
                    <Good fill="#019e74" width="1.5rem" />
                )}
                {recommendStatus === 'bad' && (
                    <Bad fill="rgb(229, 9, 20)" width="1.5rem" />
                )}
            </NicknameAndRecommend>
            <Text>{commentText}</Text>
        </CommentWrapper>
    )
}
