import * as auth from 'auth-provider';
import { FullPageErrorFallBack, FullPageLoading } from 'components/lib';
import React, { ReactNode } from 'react'
import { User } from 'screens/project-list/search-panel';
import { useMount } from 'utils';
import { http } from 'utils/http';
import { useAsync } from 'utils/use-async';
import * as authStore from 'store/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { bootstrap, selectUser } from 'store/auth.slice';
import { useCallback } from 'react';

export interface AuthForm {
    username: string;
    password: string;
}

// 刷新页面时初始化user，防止出现刷新页面时就退出登录状态
export const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http('me', { token });
        user = data.user;
    }
    return user;
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const {
        error,
        isLoading,
        isIdle,
        isError,
        run,
    } = useAsync<User | null>();
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()


    // 页面加载时调用
    useMount(() => {
        // bootstrapUser().then(setUser)
        run(dispatch(bootstrap()));
    })
    if (isIdle || isLoading) {
        return <FullPageLoading />
    }

    // 如果因为错误登出的话，让用户知道错误信息
    if (isError) {
        return <FullPageErrorFallBack error={error} />
    }

    // 无论在哪个组件里，都可以全局调用三个方法，用user读取相应的信息（token)
    return <div>{children}</div>;
}

export const useAuth = () => {
    // dispatch加上类型是为了要求返回一个promise
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
    const user = useSelector(selectUser)
    const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
    const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
    return {
        user,
        login,
        register,
        logout
    }
}