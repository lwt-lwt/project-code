import React, { useState } from 'react'

// 状态：在某个上下文中（用户界面）数据和改变数据的行为

/* export default function State() {
    // count 是一个状态， setCount是关联到状态的行为
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>点了{count}次</p>
            <button onClick={() => { setCount(count + 1) }}>点击</button>
        </div>
    )
} */

// 自定义一个hook
function useCount(initialValue) {
    const [count, setCount] = useState(initialValue);
    return [
        count,
        () => {
            setCount(count + 1)
        }
    ]
}
export default function State() {
    // 通过改变行为来改变count的值
    // 把数据和行为关联在一起，强关联
    // 数据行为与UI之间是，弱关联，UI只需要知道我触发这个行为即可，具体干了啥不需要知道
    const [count, addCount] = useCount(0);
    return (
        <div>
            Your count:{count}
            <button onClick={() => { addCount() }}>Add</button>
        </div>
    )
}