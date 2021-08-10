import React from "react";

// 错误边界用class组件实现
// Component<any, any>两个泛型分为别为P(props), S(state)
/* 
props要传入的属性：
children: ReactNode
fallbackRender: 备用方案
*/
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
// export class ErrorBoundary extends React.Component<{ children: ReactNode, fallbackRender: FallbackRender }, any> {
// 另一种写法
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {
    state = { error: null };

    // 当ErrorBoundary的子组件抛出异常，这里就会接收到并调用下面的方法，并更新state里的error
    static getDerivedStateFromError(error: Error) {
        return { error }
    }

    render() {
        const {error} = this.state;
        const {fallbackRender, children} = this.props;
        if (error) {
            return fallbackRender({error});
        }
        return children
    }
}