import React from 'react'
import styled from 'styled-components'

const NotificationMessageWrapper = styled.div`
    display: flex;
    align-items: center;
`

function NotificationMessage({ message, children = undefined }) {
    return (
        <NotificationMessageWrapper>
            {children}
            <span>{message}</span>
        </NotificationMessageWrapper>
    )
}

export default NotificationMessage
