import { useAsync } from "./use-async"
import { Project } from 'screens/project-list/list'
import { useCallback, useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"

// 参数为要搜索的对象
export const useProjects = (param?: Partial<Project>) => {
    const { run, ...result } = useAsync<Project[]>()
    const client = useHttp();

    const fetchProjects = useCallback(
        () => client('projects', { data: cleanObject(param || {}) }), [param, client]
    );

    // 获取项目列表接口的代码
    useEffect(() => {
        run(fetchProjects(), { retry: fetchProjects })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param, run, fetchProjects])
    return result;
}

// 这个函数不能传参数，因为hook只能放在最外层，不能放在其他函数里面
export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'PATCH',
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}
export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST',
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}