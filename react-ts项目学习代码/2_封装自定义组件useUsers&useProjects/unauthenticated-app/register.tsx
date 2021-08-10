import { useAuth } from 'context/auth-context';
import React from 'react'
import {Form, Input, Button} from 'antd'
import { LongButton } from 'unauthenticated-app';


// const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = () => {
    const { register, user } = useAuth();
    /* 不再使用，提取出来到authProvider中
    const login = (param: { username: string, password: string }) => {
        fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        }).then(
            async (response:Response) => {
                if (response.ok) {
                    
                }
            })
    } */

    const handleSubmit = (values:{username: string, password: string}) => {
        register(values)
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={"username"} rules={[{required: true, message:"请输入用户名"}]}>
                <Input placeholder={'用户名'} type="text" id={'username'} />
            </Form.Item>
            <Form.Item name={"password"} rules={[{required: true, message:"请输入密码"}]}>
                <Input placeholder={'密码'} type="password" id={'password'} />
            </Form.Item>
            <Form.Item>
                <LongButton htmlType={'submit'} type={'primary'}>注册</LongButton>
            </Form.Item>
        </Form>
    )
}

