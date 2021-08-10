import React, { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import qs from 'qs'
import { useHttp } from 'utils/http'

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
    // 状态提升
    const [users, setUsers] = useState([]);
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
    const [list, setList] = useState([]);
    const debouncedParam = useDebounce(param, 200);
    const client = useHttp()

    // 获取项目列表接口的代码
    useEffect(() => {
        client('projects', {data: cleanObject(debouncedParam)}).then(setList)
        /* 不再使用下面的方法，使用上面的封装好的一个fetch函数来调用
        // 使用qs来简化代码
        // fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`).then(async response => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(
            async (response: Response) => {
                if (response.ok) {
                    setList(await response.json());
                }
            })
        // }, [param])  换成debouncedParam */
    }, [debouncedParam])

    /* 初始化users，为空数组的原因是只需要在页面渲染的时候触发一次
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, []) 
    改为自定义写的形式，简化代码，复用组件
    */
    useMount(() => {
        client('users').then(setUsers)
        /* fetch(`${apiUrl}/users`).then(async (response: Response) => {
            if (response.ok) {
                setUsers(await response.json())
            }
        }) */
    })

    return (
        <div>
            {/* 通过 props 将状态提升的信息传递给子组件 */}
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    )
}