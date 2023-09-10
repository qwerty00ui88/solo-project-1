import React from 'react'
import styled from 'styled-components'
import PageTemplate from './PageTemplate'
import Outline from '../Outline'

const OutlineTemplate = styled.div`
    border: 1px solid yellow;
    height: 60vh;
`

function DetailPageTemplate({ id }: { id: string }) {
    return (
        <PageTemplate>
            <OutlineTemplate>
                <Outline id={id} />
            </OutlineTemplate>
        </PageTemplate>
    )
}

export default DetailPageTemplate
