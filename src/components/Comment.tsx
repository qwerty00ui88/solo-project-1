import React from 'react'
import styled from 'styled-components'
import { smallRadius } from '../style/border'

const CommentWrapper = styled.div`
    background-color: #e5e5e5;
    border-radius: ${smallRadius};
    padding: 0.5rem;
    > div {
        color: black;
    }
`

export interface CommentProps {
    nickname: string
    commentText: string
}

function Comment({ nickname, commentText }: CommentProps) {
    return (
        <CommentWrapper>
            <div>{nickname}</div>
            <div>{commentText}</div>
        </CommentWrapper>
    )
}

export default Comment
