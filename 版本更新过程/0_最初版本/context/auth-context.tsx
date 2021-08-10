import * as auth from 'auth-provider';
import React, { ReactNode, useState } from 'react'
import { User } from 'screens/project-list/search-panel';


interface AuthForm {
    username: string;
    password: string;
}

const AuthContext = React.createContext<{
    user: User | null;
    register: (form: AuthForm) => Promise<void>;
    login: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
} | undefined>(undefined);
// displayname 用来显示名称
// 当一个函数的 displayName 属性被定义，这个函数的 displayName 属性将返回显示名称。
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    // const login = (form: AuthForm) => auth.login(form).then(user => setUser(user));
    // 可以消参————————point free
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));
    // 无论在哪个组件里，都可以全局调用三个方法，用user读取相应的信息（token)
    return <AuthContext.Provider children={children} value={{user, login, register, logout}}/>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context;
}