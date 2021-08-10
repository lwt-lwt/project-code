import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
    return (
        <div>
            <h1>ProjectScreen</h1>
            <Link to={'kanban'}>看板</Link>
            <Link to={'epic'}>任务组</Link>
            <Routes>
                {/* projects/:projectId/kanban */}
                <Route path={'/kanban'} element={<KanbanScreen />}></Route>
                {/* projects/:projectId/epic */}
                <Route path={'/epic'} element={<EpicScreen />}></Route>
                {/* 相当于重定向 */}
                <Navigate to={window.location.pathname + '/kanban'}/>
            </Routes>
        </div>
    )
}