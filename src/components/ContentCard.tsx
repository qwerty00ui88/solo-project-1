import React from 'react'
import { styled } from 'styled-components'

const ContentCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 33%;
    height: 100%;
    border: 1px solid #00ff3c;
    * {
        border: 1px solid #d4ff00;
    }
`

const Description = styled.div`
    flex: 1;
`

function ContentCard() {
    return (
        <ContentCardWrapper>
            <div>fsa</div>
            <Description>fsa</Description>
        </ContentCardWrapper>
    )
}

export default ContentCard
