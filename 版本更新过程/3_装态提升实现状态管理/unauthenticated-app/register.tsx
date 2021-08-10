import { useAuth } from 'context/auth-context';
import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';

// 传入的参数是为了捕捉错误 
export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { register, user } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });
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
    // 把cpassword单独拿出来，因为他不参与服务器的交互
    const handleSubmit = async ({cpassword, ...values}: { username: string, password: string, cpassword: string }) => {
        if(cpassword !== values.password) {
            onError(new Error('请确认两次输入的密码相同'));
            return;
        }
        try {
            await run(register(values));
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
            {/* 密码验证 */}
            <Form.Item name={"cpassword"} rules={[{ required: true, message: "请确认密码" }]}>
                <Input placeholder={'确认密码'} type="password" id={'cpassword'} />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>注册</LongButton>
            </Form.Item>
        </Form>
    )
}

