import { useState } from "react";

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

// (initialState?: State<D>)是用户传入的state
export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    });
    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })
    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null
    })
    // run 用来触发异步请求
    const run = (promise: Promise<D>) => {
        // 没有then属性表示不是promise
        if (!promise || !promise.then) {
            throw new Error('请传入Promise类型数据');
        }
        // 传入的是正常的promise，就将异步请求触发刚开始时要改成loading，表示loading开始了
        setState({ ...state, stat: 'loading' })
        return promise
            .then(data => {
                setData(data);
                return data;
            }).catch(error => {
                setError(error);
                return error;
            })
    }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state
    }
}