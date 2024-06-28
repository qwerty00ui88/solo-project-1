import { useState } from 'react'

export default function useBoolean(init = false) {
    const [boolean, setBoolean] = useState(init)

    const setTrue = () => {
        setBoolean(true)
    }

    const setFalse = () => {
        setBoolean(false)
    }

    const toggle = () => {
        setBoolean(!boolean)
    }

    const set = (value) => {
        setBoolean(value)
    }

    return { boolean, setTrue, setFalse, toggle, set }
}
