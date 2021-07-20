import React, { useReducer } from 'react'


// reducer：提供一种抽象状态行为的通用封装（action），以及计算过程的抽象方案（reducer）

function reducer(state, action){
    // state：数字
    // action:对象
    switch (action.type) {
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
        default:
             
    }
}


export default function Counter() {
    // dispach是派发  一个状态，两个行为 
    // reducer：第三个参数init为函数，第二个参数为初始状态，可以是一个对象
    const [counter, dispatch] = useReducer(reducer, 0)
    return (
        <div>
            Your counter is: {counter} 
            <button onClick={() => {dispatch({type: 'add'})}}>+</button>
            <button onClick={() => {dispatch({type: 'sub'})}}>-</button>
        </div>
    )  
}