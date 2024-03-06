import React, { MouseEvent, ReactElement } from 'react'

interface IconButtonProps {
    onClick: (e?: MouseEvent<HTMLButtonElement>) => void
    children: ReactElement
}

function IconButton({ onClick, children }: IconButtonProps) {
    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    )
}

export default IconButton
