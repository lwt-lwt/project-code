import React from "react";
import { Input, Form } from 'antd';
import { Project } from "./list";
import { UserSelect } from "components/user-select";
// 指定本文件的编译器 没起作用，甚至会导致出错 /两个星星 艾特jsx jsx */
// import { jsx } from "@emotion/react";
export interface User {
    id: number;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>
    setParam: (param: SearchPanelProps['param']) => void;
}

// 函数的参数通过解构赋值获取父组件传递过来的内容
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
    /* 
    users也需要变量提升，这是因为后端返回的有些数据不是我们想要的，需要进行一定的处理
    // 用来更新下拉列表
    const [users, setUsers] = useState([])

    为了实现状态提升，把 list 相关的代码提升到父组件中去

    // 用来获取用户在input输入内容时的状态变化
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
    // 用来保存项目列表数据的状态
    const [list, setList] = useState([])
    // 获取项目列表接口的代码,最后[]为依赖（即什么时候获取，当param改变的时候获取）\
    // fetch返回的结果是一个promise
    // 当用户输入关键词或者选择select框时，param变化去同步请求列表
    useEffect(() => {
        fetch('').then(async response => {
            // 如果response的ok属性为true的话，说明请求成功了
            if(response.ok) {
                setList(await response.json())
            }
        })
    }, [param])    
    */
    return (
        // <Form css={{ marginBottom: "2rem" }} layout={"inline"}> 不知道为什么这个不起作用
        <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
            <Form.Item>
                <Input
                    placeholder={'项目名'}
                    type="text"
                    value={param.name}
                    onChange={evt => setParam({
                        ...param,
                        name: evt.target.value
                    })} />
            </Form.Item>
            <Form.Item>
                <UserSelect
                    defaultOptionName={'负责人'}
                    value={param.personId}
                    onChange={value =>
                        setParam({
                            ...param,
                            personId: value
                        })}
                />
                {/* 
                将select提取出来，上面的组件    
                <Select
                    value={param.personId}
                    onChange={value =>
                        setParam({
                            ...param,
                            personId: value
                        })}>
                    option的 value 属性规定在表单被提交时被发送到服务器的值
                    <Select.Option value=''>负责人</Select.Option>
                    {
                        users.map(user => <option key={user.id} value={String(user.id)}>{user.name}</option>)
                    }
                </Select> */}
            </Form.Item>
        </Form>
    )
}