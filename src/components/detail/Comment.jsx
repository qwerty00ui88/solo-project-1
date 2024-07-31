import React from 'react'
import styled from 'styled-components'
import CommentItem from './CommentItem'
import { xlargeSize } from '../../style/font'

const SubTitle = styled.h3`
    font-size: ${xlargeSize};
`
const CommentUl = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

export default function Comment({ commentList }) {
    return (
        <section>
            <SubTitle>코멘트</SubTitle>
            <CommentUl>
                {commentList?.map((c) => {
                    return (
                        <CommentItem
                            key={c.comment.id}
                            id={c.userId}
                            nickname={c.nickname}
                            commentText={c.comment.text}
                            recommendStatus={c.recommendStatus}
                        />
                    )
                })}
            </CommentUl>
        </section>
    )
}
