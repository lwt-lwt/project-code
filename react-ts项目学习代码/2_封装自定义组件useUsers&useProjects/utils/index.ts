import { useEffect, useState } from 'react'

// 注意value为零的情况,!!value的意思是把一个值转换为布尔值，一个叹号是对一个值求反，两个叹号是返回1其布尔值
export const isFalsy = (value: unknown) => value === 0 ? false : !value;
// 解决bug：如果值为false时的情况，isFalsy会将其删除，但是是有意义的，不能删除。如 {checked: false}的形式
// value为undefined、null、空字符串是没有意义的
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在一个函数里，改变传入对象本身是不好的,因此需要对其进行复制
/* 
进行解构时，不要直接写成object的形式，会出现错误————ts认为其是个空对象
export const cleanObject = (object: object) => {
因此写清楚需要的形式是什么
*/
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object };
    Object.keys(result).forEach(key => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    })
    return result;
}

// 自定义useMount，为了避免出现特别多的useEffect的空数组的情况
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // TODO 依赖项里加上Callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

// 在这里需要用泛型来解决value的类型以及该函数返回值类型的问题
export const useDebounce = <V>(value: V, delay?: number) => {
    // 声明一个新的状态
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // 每次在value变化之后，设置一个定时器。
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);
        // 每次在上一个useEffect处理完以后再运行
        return () => { clearTimeout(timeout) }
    }, [value, delay])
    return debouncedValue;
}

// 传入的initialArray的参数类型为A的数组
export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray);
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value];
            copy.splice(index, 1);
            setValue(copy);
        }
    }
}