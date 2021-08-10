import React from 'react'
import { User } from './search-panel'

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}

interface ListProps {
    users: User[];
    list: Project[];
}

export const List = ({ users, list }: ListProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map(project => <tr key={project.id}>
                        <td>{project.name}</td>
                        {/* 由于后端返回的数据不一定就是我们想要的personName的这种形式，因此需要改变 */}
                        {/* <td>{project.personName}</td> */}
                        {/* 
                        <td>{users.find(user => user.id === project.personId).name}</td>
                        要防止返回找不到的情况为undefined，undefined.nama会报错,改成下面的形式
                        问号的含义时，如果前面表达式的值为undefined，则整个表达式都是undefined，不会报错
                        为undefined时返回默认值未知
                        */}
                        <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                    </tr>)
                }
            </tbody>

        </table>
    )
}