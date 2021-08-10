import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils";

/* 
返回页面url中，指定键的参数值
*/
// as const 的作用时解决其返回值类型的问题。返回最原始的类型
// 对K做出限制 K extends string
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    // 获取url中的param
    const [searchParams, setSearchParam] = useSearchParams();
    return [
        // 只有searchParams才会进行useMemo的运算
        useMemo(
            () => keys.reduce((prev, key) => {
                return { ...prev, [key]: searchParams.get(key) || '' }
            }, {} as { [key in K]: string }),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParams]
        ),
        // {} as { [key in string]: string }) 解决初始值的类型问题;
        // 改成泛型以后，可以让其返回值为{string，string}类型
        (params: Partial<{[key in K]:unknown}>) =>{
            const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit;
            return setSearchParam(o);
        }
    ] as const
}