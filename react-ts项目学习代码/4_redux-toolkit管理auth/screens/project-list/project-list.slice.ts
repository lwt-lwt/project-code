import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store';

interface State {
    projectModalOpen: boolean;

}

const initialState: State = {
    projectModalOpen: false,
}
export const projectListSlice = createSlice({
    // 标识slice本身
    name: 'projectListSlice',
    initialState,
    reducers: {
        openProjectModal(state) {
            state.projectModalOpen = true;
        },
        closeProjectModal(state) {
            state.projectModalOpen = false;
        }
    }
});

export const projectListAction = projectListSlice.actions
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen