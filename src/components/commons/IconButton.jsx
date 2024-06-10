import React from 'react'

export default function IconButton({ onClick, children }) {
    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    )
}
