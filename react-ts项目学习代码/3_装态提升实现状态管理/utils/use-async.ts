import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
    error: Error | null;
    data: D | null;
    // idle：状态尚未发生； loading:状态正在发生； error: 状态发生有错误;  success：状态发生无错误
    stat: 'idle' | 'loading' | 'error' | 'success'
}

// 默认的state
const defaultInitialState: State<null> = {
    // 一开始状态是idle
    stat: 'idle',
    data: null,
    error: null
}

// 让抛出的异常成为一个可选项
const defaultConfig = {
    throwOnError: false
}


// (initialState?: State<D>)是用户传入的state
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, initialConfig };
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    });
    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null
    }), [])
    const setError = useCallback((error: Error) => setState({
        error,
        stat: 'error',
        data: null
    }), [])
    const mountedRef = useMountedRef();
    const [retry, setRetry] = useState(() => () => { })
    // run 用来触发异步请求
    // 增加一个retry配置，让其能够返回一个promise，能够实现自动重新渲染的目的
    const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        // 没有then属性表示不是promise
        if (!promise || !promise.then) {
            throw new Error('请传入Promise类型数据');
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        // 传入的是正常的promise，就将异步请求触发刚开始时要改成loading，表示loading开始了
        setState(prevState => ({ ...prevState, stat: 'loading' }))
        return promise
            .then(data => {
                // 如果mountedRef.current为true，说明此时组件被挂载且未被卸载
                if (mountedRef.current) {
                    setData(data);
                }
                return data;
            })
            .catch(error => {
                // catch 会消化异常，如果不主动抛出，外面是接收不到异常的
                setError(error);
                if (config.throwOnError) {
                    // return error; 不能抛出异常
                    return Promise.reject(error);
                }
                return error;
            })
    }, [config.throwOnError, mountedRef, setData, setError])




    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        // 得到返回值以后刷新页面 retry被调用时，重新跑一遍run，让state刷新一遍
        retry,
        ...state
    }
}