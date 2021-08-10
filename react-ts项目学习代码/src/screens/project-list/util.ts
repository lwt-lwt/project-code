import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";

// 项目列表搜索的参数
export const useProjectsSearchParamas = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    // 对param做一个转换
    return [
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),        
        setParam
    ] as const
}