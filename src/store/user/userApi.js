import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {actions} from './user.slice';

const API_URL = import.meta.env.VITE_API_URL;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = window.localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (user) => ({
                body: user,
                url: 'auth/login',
                method: 'POST',
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(actions.setUser(data));
                    if ('token' in data) {
                        window.localStorage.setItem('token', data.token || '');
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        }),

        getMe: builder.query({
            query: () => 'auth/me',
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(actions.setUser(data));
                } catch (error) {
                    console.error(error);
                }
            },
        }),

        sendMessage: builder.mutation({
            query: (message) => ({
                body: message,
                url: 'contact',
                method: 'POST',
            }),
        }),

        getMessages: builder.query({
            query: () => '/messages',
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(actions.setMessages(data.messages));
                } catch (error) {
                    console.error(error);
                }
            },
        }),
    }),
});

export const {
    useGetMeQuery, useLoginMutation, useSendMessageMutation, useGetMessagesQuery
} = userApi;
