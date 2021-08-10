import React from 'react'
import { User } from './search-panel'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'


export interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: number;

}

// 直积让ListProps继承TableProps，可以避免想给Table添加属性时重复操作（不用一个个手动添加）。
interface ListProps extends TableProps<Project> {
    users: User[];
    // list: Project[];    可以删掉，因为list已经包含在TableProps里面
}

export const List = ({ users, ...props }: ListProps) => {
    return (
        <Table pagination={false} columns={[
            {
                title: '名称',
                dataIndex: 'name',
                // localeCompare可以对中文字符进行排序
                sorter: (a, b) => a.name.localeCompare(b.name)
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
            }
        ]} 
        // dataSource={list} 改用extends TableProps后删掉，改成下面的形式
        {...props}
        />

    )
}