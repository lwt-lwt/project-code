import * as auth from 'auth-provider';
import { FullPageErrorFallBack, FullPageLoading } from 'components/lib';
import React, { ReactNode } from 'react'
import { User } from 'screens/project-list/search-panel';
import { useMount } from 'utils';
import { http } from 'utils/http';
import { useAsync } from 'utils/use-async';

interface AuthForm {
    username: string;
    password: string;
}

// 刷新页面时初始化user，防止出现刷新页面时就退出登录状态
const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http('me', { token });
        user = data.user;
    }
    return user;
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

    const { data:user, error, isLoading, isIdle, isError, run, setData:setUser } = useAsync<User | null>();

    // const [user, setUser] = useState<User | null>(null);
    // const login = (form: AuthForm) => auth.login(form).then(user => setUser(user));
    // 可以消参————————point free
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    // 页面加载时调用
    useMount(() => {
        // bootstrapUser().then(setUser)
        run(bootstrapUser());
    })
    if (isIdle || isLoading) {
        return <FullPageLoading/>
    }

    // 如果因为错误登出的话，让用户知道错误信息
    if(isError) {
        return <FullPageErrorFallBack error={error}/>
    }

    // 无论在哪个组件里，都可以全局调用三个方法，用user读取相应的信息（token)
    return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context;
}