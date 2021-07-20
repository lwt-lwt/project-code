import React, { } from 'react'
import useDraggable from './useDraggable'

const list = [
    {
        src: 'http://inews.gtimg.com/newsapp_match/0/11823433788/0.jpg',
        title: '血小板合集'
    },
    {
        src: 'http://inews.gtimg.com/newsapp_match/0/11823433788/0.jpg',
        title: '血小板可爱'
    },
    {
        scr: 'http://inews.gtimg.com/newsapp_match/0/11823433788/0.jpg',
        title: '血小板吹口哨'
    }
]

export default function App() {
    return (
        <div className='App'>
            <h1>Hello 血小板</h1>
            <h2>见证奇迹</h2>
            <DraggableList list={list} />
        </div>
    )
}

function DraggableList({ list }) {
    const { dragList, createDraggerProps, createDrppoerProps } = useDraggable(list)
    return dragList.map((item, i) => {
        if (item.type === 'BAR') {
            return <Bar id={i} {...createDrppoerProps()} {...createDraggerProps()} key={item.id} />
        } else {
            return (
                <Draggable {...createDraggerProps()}>
                    <Card {...item.data} />
                </Draggable>
            )
        }
    })

}

// 
function Draggable({ children, eventHandlers, dragging, id }) {
    return (
        <div {...eventHandlers} draggable={true} className='draggable'>
            {children}
        </div>
    )
}


function Bar() {
    return (
        <div className='draggable-bar'>

        </div>
    )
}


function cls(def, conditions) {
    const
}

function Card({ src, title }) {
    return (
        <div className='card'>
            <img src={src} alt='血小板合集' />
            <span>{title}</span>
        </div>
    )
}