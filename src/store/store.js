import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as userReducer } from './user/user.slice';
import { userApi } from './user/userApi';
import { reducer as projectsReducer } from './projects/projects.slice';
import { projectsApi } from './projects/projectsApi';

const reducers = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    userReducer,
    projectsReducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat([ userApi.middleware, projectsApi.middleware ]),
});
