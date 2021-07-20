import React, { useEffect, useState } from 'react'

// 状态：在某个上下文中（用户界面）数据和改变数据的行为
// 作用（Effect）：客观世界存在输入和输出之外的东西（改变URL，改变环境）

// 把useEffect的输出定义到函数之外
// function log(count) {
//     console.log(`你点击的次数为：${count}`)
// }

/* export default function State() {
    // count 是一个状态， setCount是关联到状态的行为
    const [count, setCount] = useState(0);

    // 理解成一个描述
    // 读作：依赖[xx]变化的作用， []为第二个参数 
    // useEffect(log.bind(null, count), [count])

    useEffect(() => {
        if (count > 5) window.location.href = 'https://www.baidu.com'
    },[count])

    return (
        <div>
            <p>点了{count}次</p>
            <button onClick={() => { setCount(count + 1) }}>点击</button>
        </div>
    )
} */


function useInterval(callback, time) {
    useEffect(() => {
        const I = setInterval(callback, time);
        return () => {
            clearInterval(I);
        }
    }, [])
}
export default function State() {
    const [count, setCount] = useState(0);

    useInterval(() => {
       /*   改成count => count + 1的原因：不改的话它就只是使用第一次定时器的结果，值不会改变；
            改成函数以后react会帮助我们去取最新的count值 */
        
        setCount(count => count + 1);
    }, 1000)

    return (
        <div>
            <p>点了{count}次</p>
            <button onClick={() => { setCount(count + 1) }}>点击</button>
        </div>
    )
}