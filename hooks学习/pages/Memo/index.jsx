import React, { useMemo, useState } from 'react'

export default function Memo() {
    const [count, setCount] = useState(0);
    // 第二个参数为依赖
    const memorizedText = useMemo(() => {
        console.log('run useMemo function');
        return `this is a memorized text ${Date.now()}`;
    // 下面的意思是每10次变一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Math.floor(count / 10)]);

    return (
        <div>
            {memorizedText}
            <p>You clicked {count}</p>
            <button onClick={() => { setCount(count + 1) }}>Click me</button>
        </div>
    )
}