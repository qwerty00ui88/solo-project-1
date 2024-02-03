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

function Comment() {
    return (
        <CommentWrapper>
            <div>코멘트 작성자</div>
            <div>코멘트 내용</div>
        </CommentWrapper>
    )
}

export default Comment
