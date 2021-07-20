import React, { useState, useRef } from 'react'

export default function UseRefexample() {
    const [counter, setCounter] = useState(0);
    const prev = useRef(null);
    return (
        <div>
            <p>当前的值：{counter}</p>
            <p>之前的值：{prev.current}</p>
            <button
                onClick={() => {
                    prev.current = counter;
                    setCounter(x => x + 1);
                }}
            >
                Click me to add
            </button>
            <button
                onClick={() => {
                    prev.current = counter;
                    setCounter(x => x - 1)
                }}
            >
                Click me to remove
            </button>
        </div>
    )
}