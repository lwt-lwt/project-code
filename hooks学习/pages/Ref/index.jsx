import React, { useRef } from 'react'
import Ref2 from './index2'
/* 
ref：应用react管理以外的对象
                需要子react之外做一些事情，例如：focus、媒体对象操作等
                通常搭配useEffect
        附带作用：方便的保存值
*/

export default function UseRefExample() {
    const refInput = useRef()
    return (
        <div>
            <input ref={refInput} />
            <button
                onClick={() => { 
                    refInput.current.focus()
                }}
            >
                Focus
            </button>
            <br />
            <p>Ref2</p>
            <Ref2/>
        </div>
    )
}