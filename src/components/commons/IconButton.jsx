import React from 'react'

function IconButton({ onClick, children }) {
    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    )
}

export default IconButton
