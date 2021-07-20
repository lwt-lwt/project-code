import React, {  useState, useCallback } from 'react'

export default function Callback() {
    const [count, setCount] = useState(0);

    const add = useCallback(
        () => {
            setCount(x => x + 1)
        }, [])

    return (
        <div>
            {count}
            <button
                onClick={add}
            >
                +
            </button>
        </div>
    )
}