import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"

// 存储非登录状态
export const UnauthenticatedApp = () => {
    // 用来切换登录状态，默认是false，即未登录
    const [isRegister, setisRegister] = useState(false)
    return <div>
        {
            isRegister ? <RegisterScreen /> : <LoginScreen />
        }
        <button onClick={() => setisRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}</button>
    </div>
}