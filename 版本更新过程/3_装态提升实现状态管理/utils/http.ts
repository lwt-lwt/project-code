// 封装一个函数，让每次请求都能自动携带token的状态。
// 实现刷新时依然保留登陆的状态

import qs from "qs";
import * as auth from 'auth-provider'
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
    data?: object;
    token?: string;
}

// endpoint为请求地址后面的名字，如 /projects 中的projects
// 参数后面增加的 = {}，是增加一个默认值
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    // config的默认值的为前面写的(如方法的请求为get),customConfig里面的会覆盖掉前面的,所以需要用if来判断请求的方式
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            "Content-Type": data ? 'application/json' : ''
        },
        ...customConfig
    }
    // 在get请求里，所传的参数需要带到fetch的url中， post 和 delete 是直接放在body中的
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(
            async response => {
                // 处理特殊情况：未登录或者token失效的情况下返回401的状态
                if (response.status === 401) {
                    await auth.logout();
                    window.location.reload();
                    return Promise.reject({ message: '请重新登录' })
                }
                const data = await response.json();
                if (response.ok) {
                    return data;
                } else {
                    return Promise.reject(data)
                }
            }
        )
}


// 可以自动携带token的方法
export const useHttp = () => {
    const { user } = useAuth();
    // return ([endpoint, config]:[string, Config]) => http(endpoint, {...config, token: user?.token});
    // 优化：使用Parameters---TS Utility Types  
    // ...的作用是把tupple里面的参数解放出来
    return useCallback(
        (...[endpoint, config]: Parameters<typeof http>) =>
            http(endpoint, { ...config, token: user?.token }), [user?.token]);
}