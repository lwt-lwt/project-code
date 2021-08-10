import React from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import { List } from "./list"
import { SearchPanel } from "./search-panel"
// import qs from 'qs'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
// import { useAsync } from 'utils/use-async'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
// import { useUrlQueryParam } from 'utils/url'
import { useProjectsSearchParamas } from './util'
import { Row } from 'components/lib'

// const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
    useDocumentTitle('项目列表', false);

    // 状态提升
    // 提取出来
    // const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    // // 对param做一个转换
    // const projectsParam = { ...param, personId: Number(param.personId) || undefined };

    /* 
    const [users, setUsers] = useState([]);
    const client = useHttp(); 
    */

    /* 
    // ******不再使用原生设置的loading与error，使用新的自定义的异步操作use-async
    // 显示loading的状态
    const [isLoading, setIsLoading] = useState(false);
    // 异常处理
    const [error, setError] = useState<null | Error>(null); 
    const [list, setList] = useState([]);
    */
    /* 使用进一步封装的useProjects, 没有run，useProjects会自动run
    const { run, isLoading, error, data: list } = useAsync<Project[]>()
    */


    /* 
    // 获取项目列表接口的代码
    useEffect(() => {
        
        //  ******不再使用原生设置的loading与error
        // // 请求开始时isLoading设置true
        // setIsLoading(true)
        

        run(client('projects', { data: cleanObject(debouncedParam) }))

        
        //  ******不再使用原生设置的loading与error
        // // catch用来捕捉错误,并且重置数组；finally：请求结束时把isLoading设置为false
        // client('projects', { data: cleanObject(debouncedParam) }).then(setList)
        //     .catch(error => {
        //         setList([]);
        //         setError(error);
        //     })
        //     .finally(() => setIsLoading(false))
       

        // 不再使用下面的方法，使用上面的封装好的一个fetch函数来调用
        // // 使用qs来简化代码
        // // fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`).then(async response => {
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(
        //     async (response: Response) => {
        //         if (response.ok) {
        //             setList(await response.json());
        //         }
        //     })
        // // }, [param])  换成debouncedParam 
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedParam])
     */

    /* 初始化users，为空数组的原因是只需要在页面渲染的时候触发一次
    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, []) 
    改为自定义写的形式，简化代码，复用组件
    */


    /* 
    // 使用封装好的useUsers来进行操作
    useMount(() => {
        client('users').then(setUsers)
        // fetch(`${apiUrl}/users`).then(async (response: Response) => {
        //     if (response.ok) {
        //         setUsers(await response.json())
        //     }
        // })
    })
    */
    const [param, setParam] = useProjectsSearchParamas()
    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200));
    const { data: users } = useUsers()

    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <Button onClick={() => props.setProjectModalOpen(true)}>创建项目</Button>
            </Row>

            {/* 通过 props 将状态提升的信息传递给子组件 */}
            <SearchPanel users={users || []} param={param} setParam={setParam} />

            {/* 如果有error就显示错误 */}
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}

            {/* <List users={users} list={list} />
                List 里面是Table组件，Table有dataSource属性，所以用dataSource代替。
            */}
            <List
                setProjectModalOpen={props.setProjectModalOpen}
                refresh={retry} 
                loading={isLoading}
                 users={users || []} 
                 dataSource={list || []} 
                 />
        </Container>
    )
}

// 寻找无限循环的原因
ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
padding: 3.2rem;
`