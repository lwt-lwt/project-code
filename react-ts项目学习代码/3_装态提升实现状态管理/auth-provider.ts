// 定义可以操控token的函数  
// 模拟第三方服务
// 在真实环境中,如果使用firebase第三方auth服务的话,本文件不需要开发者开发

import { User } from 'screens/project-list/search-panel'

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = '__auth_provider_token__';
export const getToken = () => window.localStorage.getItem(localStorageKey);
export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || "")
    return user;
}
export const login = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        async (response: Response) => {
            if (response.ok) {
                return handleUserResponse(await response.json())
            } else {
                // return Promise.reject(data); 为了捕捉错误，传入的不应该是data
                return Promise.reject(await response.json());
            }
        })
}
export const register = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        async (response: Response) => {
            if (response.ok) {
                return handleUserResponse(await response.json())
            } else {
                // return Promise.reject(data);  为了捕捉错误，传入的不应该是data 
                return Promise.reject(await response.json());
            }
        })
}
export const logout = async () => window.localStorage.removeItem(localStorageKey)