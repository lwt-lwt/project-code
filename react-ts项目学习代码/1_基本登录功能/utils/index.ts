import { useEffect, useState } from 'react'

// 注意value为零的情况,!!value的意思是把一个值转换为布尔值，一个叹号是对一个值求反，两个叹号是返回1其布尔值
export const isFalsy = (value: unknown) => value === 0 ? false : !value;

// 在一个函数里，改变传入对象本身是不好的
export const cleanObject = (object: object) => {
    const result = { ...object };
    // Object.keys(result).forEach(key => {
    //     const value = result[key];
    //     if (isFalsy(value)) {
    //         delete result[key];
    //     }
    // })
    return result;
}

// 自定义useMount，为了避免出现特别多的useEffect的空数组的情况
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
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