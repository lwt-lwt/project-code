import { useAsync } from "./use-async"
import { Project } from 'screens/project-list/list'
import { useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"

// 参数为要搜索的对象
export const useProjects = (param?: Partial<Project>) => {
    const { run, ...result } = useAsync<Project[]>()
    const client = useHttp();

    // 获取项目列表接口的代码
    useEffect(() => {
        run(client('projects', { data: cleanObject(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return result;
}