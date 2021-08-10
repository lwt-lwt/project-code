import { useEffect } from "react";
import { User } from "screens/project-list/search-panel";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
    const { run, ...result } = useAsync<User[]>()
    const client = useHttp();

    // 获取项目列表接口的代码
    useEffect(() => {
        run(client('users', { data: cleanObject(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result;
}