import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {actions} from "./projects.slice.js";

const API_URL = import.meta.env.VITE_API_URL;

export const projectsApi = createApi({
    reducerPath: 'projectsApi',
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
    tagTypes: ['Project'],
    endpoints: (builder) => ({

        addProjectGallery: builder.mutation({
            query: (data) => ({
                body: data,
                url: '/projects/create/gallery',
                method: 'POST',
            }),
        }),

        addProjectPlan: builder.mutation({
            query: (data) => ({
                body: data,
                url: '/projects/create/plan',
                method: 'POST',
            }),
        }),

        addProjectMain: builder.mutation({
            query: (data) => ({
                body: data,
                url: '/projects/create/main',
                method: 'POST',
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(actions.setProjects(data.projects));
                } catch (error) {
                    console.error(error);
                }
            },
        }),

        getProjects: builder.query({
            query: () => '/projects',
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(actions.setProjects(data.projects));
                } catch (error) {
                    console.error(error);
                }
            },
        }),

        deleteProject: builder.mutation({
            query: (data) => ({
                body: data,
                url: '/projects/delete',
                method: 'POST',
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(actions.setProjects(data.projects));
                } catch (error) {
                    console.error(error);
                }
            },
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useAddProjectGalleryMutation,
    useAddProjectPlanMutation,
    useAddProjectMainMutation,
    useDeleteProjectMutation,
} = projectsApi;
