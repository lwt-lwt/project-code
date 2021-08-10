import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
import React from "react";


// 抽象出一个没有内边距的button按钮
export const  ButtonNoPadding = styled(Button)`
padding: 0;
`


const FullPage = styled.div`
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`
// 全局展示一个错误信息
export const FullPageErrorFallBack = ({error}:{error:Error | null}) => <FullPage>
    <DevTools/>
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
</FullPage>

// 全局展示一个加载的状态
export const FullPageLoading = () => <FullPage>
    <Spin size={'large'}></Spin>
</FullPage>

export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number;
}>`
display: flex;
align-items: center;
justify-content: ${props => props.between ? "space-between" : undefined};
margin-bottom: ${props => props.marginBottom + 'rem'};
/* 设置子元素的边距 */
> * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
}
`;
