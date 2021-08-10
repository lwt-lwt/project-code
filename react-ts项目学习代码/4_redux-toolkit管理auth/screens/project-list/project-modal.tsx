import { Button, Drawer } from "antd";
import React from "react";
import { useDispatch , useSelector} from 'react-redux';
import { projectListAction, selectProjectModalOpen } from "./project-list.slice";


export const ProjectModal = () => {
    const dispatch = useDispatch();
    // useSelector用来读总的状态数，根状态数
    const projectModalOpen = useSelector(selectProjectModalOpen)
    return (
        <Drawer onClose={() => dispatch(projectListAction.closeProjectModal())} visible={projectModalOpen} width={'100%'}>
            <h1>Project Modal</h1>
            <Button onClick={() => dispatch(projectListAction.closeProjectModal())}>关闭</Button>
        </Drawer>
    )
}