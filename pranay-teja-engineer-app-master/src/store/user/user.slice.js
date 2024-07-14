import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    initialState: {
        user: { name: '', },
        messages: []
    },
    name: 'user',
    extraReducers: undefined,
    reducers: {
        setUser: (state, { payload: data }) => {
            state.user.name = data.user.name;
        },
        setMessages: (state, { payload: data }) => {
            state.messages = [...data];
        },
    },
});

export const { reducer, actions } = userSlice;
