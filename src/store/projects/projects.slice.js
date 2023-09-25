import { createSlice } from '@reduxjs/toolkit';

export const projectsSlice = createSlice({
    initialState: {
        pickedProject: {},
        projects: []
    },
    name: 'projects',
    extraReducers: undefined,
    reducers: {
        setProjects: (state, { payload: data }) => {
            state.projects = [...data];
        },
        setPickedProject: (state, { payload: data }) => {
            state.pickedProject = data;
        },
    },
});

export const { reducer, actions } = projectsSlice;
