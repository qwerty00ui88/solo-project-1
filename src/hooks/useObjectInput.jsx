import { useState } from 'react'

export default function useObjectInput(init) {
    const [obj, setObj] = useState(init)

    const onChange = (e) => {
        const { name, value } = e.target
        setObj(() => ({
            ...obj,
            [name]: value,
        }))
    }

    return { obj, onChange }
}
