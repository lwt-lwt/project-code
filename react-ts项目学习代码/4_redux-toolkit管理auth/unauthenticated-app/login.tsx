import { useAuth } from 'context/auth-context';
import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';
import {useDispatch} from 'react-redux'

// 传入的参数是为了捕捉错误 
export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { login, user } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });
    const dispatch = useDispatch();
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

    // 加上async和await的原因：因为login是异步任务，login调用时就会直接调用onError，但是login还没有完成
    const handleSubmit = async (values: { username: string, password: string }) => {
        try {
            // await login(values); 改成useAsync，可以实现登录时有一个加载的状态。同时由于run返回一个promise，所以不需要await
            await run(login(values))
        } catch (e) {
            onError(e);
        }
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
                <Input placeholder={'用户名'} type="text" id={'username'} />
            </Form.Item>
            <Form.Item name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
                <Input placeholder={'密码'} type="password" id={'password'} />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>登录</LongButton>
            </Form.Item>
        </Form>
    )
}

