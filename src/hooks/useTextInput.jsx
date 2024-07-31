import { useState } from 'react'

export default function useTextInput(init = '') {
    const [value, setValue] = useState(init)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return { value, onChange, reset }
}
