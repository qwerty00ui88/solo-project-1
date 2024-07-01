import React from 'react'
import styled from 'styled-components'

const IconButtonWrapper = styled.button`
    & svg {
        fill: ${(props) => (props.$fill ? props.$fill : '#e5e5e5')};
    }
`

export default function IconButton({ onClick, children, fill = undefined }) {
    return (
        <IconButtonWrapper type="button" onClick={onClick} $fill={fill}>
            {children}
        </IconButtonWrapper>
    )
}
