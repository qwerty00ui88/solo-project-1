import React, { ReactElement } from 'react'
import styled from 'styled-components'

const NotificationMessageWrapper = styled.div`
    display: flex;
    align-items: center;
`

function NotificationMessage({
    message,
    children = undefined,
}: {
    message: string
    children?: ReactElement
}) {
    return (
        <NotificationMessageWrapper>
            {children}
            <span>{message}</span>
        </NotificationMessageWrapper>
    )
}

export default NotificationMessage
