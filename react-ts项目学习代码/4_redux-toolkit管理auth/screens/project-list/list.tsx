import React from 'react'
import { User } from './search-panel'
import { Dropdown, Menu, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
// 二者的关系为：类似于react和react-dom/react-native/react-vr
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
import { useDispatch } from 'react-redux';
import { projectListAction } from './project-list.slice'

// TODO 把所有的id改成number类型
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

// 直积让ListProps继承TableProps，可以避免想给Table添加属性时重复操作（不用一个个手动添加）。
interface ListProps extends TableProps<Project> {
    users: User[];
    // list: Project[];    可以删掉，因为list已经包含在TableProps里面
    refresh?: () => void;
    projectButton: JSX.Element
}

export const List = ({ users, ...props }: ListProps) => {
    const dispatch = useDispatch();
    const { mutate } = useEditProject();
    // 利用柯理化改造
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
    return (
        <Table pagination={false} columns={[
            // {
            //     title: '名称',
            //     dataIndex: 'name',
            //     // localeCompare可以对中文字符进行排序
            //     sorter: (a, b) => a.name.localeCompare(b.name)
            // },
            // 名称改成超链接,实现跳转的功能
            {
                title: <Pin checked={true} disabled={true} />,
                render(value, project) {
                    return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
                }
            },
            {
                title: '名称',
                sorter: (a, b) => a.name.localeCompare(b.name),
                render(value, project) {
                    return <Link to={String(project.id)}>{project.name}</Link>
                }
            },
            {
                title: '部门',
                dataIndex: 'organization',
            },
            {
                title: '负责人',
                render(value, project) {
                    return <span>
                        {users.find((user) => user.id === project.personId)?.name || '未知'}
                    </span>
                }
            },
            {
                title: '创建时间',
                render(value, project) {
                    return <span>
                        {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                    </span>
                }
            },
            {
                render(value, project) {
                    return (
                        <Dropdown overlay={<Menu>
                            <Menu.Item key={'edit'}>
                                <ButtonNoPadding onClick={() => dispatch(projectListAction.openProjectModal())} type={'link'}>编辑</ButtonNoPadding>
                            </Menu.Item>
                        </Menu>}>
                            <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
                        </Dropdown>
                    )
                }
            }
        ]}
            // dataSource={list} 改用extends TableProps后删掉，改成下面的形式
            {...props}
        />

    )
}