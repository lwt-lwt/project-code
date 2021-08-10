import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (props: { projectButton: JSX.Element }) => {
    const { data: projects, isLoading } = useProjects();
    // 把收藏项目遍历出来
    const pinnedProjects = projects?.filter(project => project.pin);
    const content = (
        <ContentContainer>
            <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
            <List>
                {
                    pinnedProjects?.map(project => <List.Item><List.Item.Meta title={project.name} /></List.Item>)
                }
            </List>
            <Divider />
            {props.projectButton}
        </ContentContainer>
    )
    return (
        <Popover placement={'bottom'} content={content}>
            项目
        </Popover>
    )
}

const ContentContainer = styled.div`
min-width: 30rem;
`