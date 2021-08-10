// 登录状态的app
import styled from '@emotion/styled'
import { ButtonNoPadding, Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import React, { useState } from 'react'
import { ProjectListScreen } from 'screens/project-list'
import { Button, Dropdown, Menu } from 'antd'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'

export const AuthenticatedApp = () => {
    // 状态提升的方法实现创建项目表单
    const [projectModalOpen, setProjectModalOpen] = useState(false);

    return (
        <Container>
            <PageHeader
                projectButton={
                    <ButtonNoPadding
                        onClick={() => setProjectModalOpen(true)}
                        type={'link'}
                    >
                        创建项目
                    </ButtonNoPadding>
                } />
            <Main>
                <Router>
                    <Routes>
                        <Route path={'/projects'} element={<ProjectListScreen projectButton={
                            <ButtonNoPadding
                                onClick={() => setProjectModalOpen(true)}
                                type={'link'}
                            >
                                创建项目
                            </ButtonNoPadding>
                        } />} />
                        {/* :projectId,冒号代表后面跟的是一个变量; /*的意思是后面什么都可以，即一个通用的字符串 */}
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                        {/* 相当于重定向 */}
                        <Navigate to={'/projects'} />
                    </Routes>
                </Router>
            </Main>
            <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
        </Container>
    )
}

const PageHeader = (props: { projectButton: JSX.Element }) => {

    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type={'link'} onClick={resetRoute}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
                </ButtonNoPadding>
                <ProjectPopover {...props} />
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}

const User = () => {
    const { logout, user } = useAuth()
    return (
        <Dropdown overlay={<Menu>
            <Menu.Item key={'logout'}>
                <Button onClick={logout} type={'link'}>登出</Button>
            </Menu.Item>
        </Menu>}>
            {/* dropdown 展示的内容 */}
            <Button type={'link'} onClick={e => e.preventDefault()}>
                {user?.name}
            </Button>
        </Dropdown>
    )
}

const Container = styled.div`
display: grid;
grid-template-rows: 6rem 1fr 6rem;
height: 100vh;
`;
/* 
const Header = styled.header`
grid-area: header; 
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`
const HeaderLeft = styled.div`
display: flex;
align-items: center;
`
使用可以复用的来代替这种写法
*/
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;


