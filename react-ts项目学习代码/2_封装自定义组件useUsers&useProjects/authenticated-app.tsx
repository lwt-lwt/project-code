// 登录状态的app
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg'
import React from 'react'
import { ProjectListScreen } from 'screens/project-list'
import { Button, Dropdown, Menu } from 'antd'

export const AuthenticatedApp = () => {
    const { logout, user } = useAuth()
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
                    <h3>2</h3>
                    <h3>3</h3>
                </HeaderLeft>
                <HeaderRight>
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
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </Container>
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


