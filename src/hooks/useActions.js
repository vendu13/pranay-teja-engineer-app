import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions as userActions } from '../store/user/user.slice';
import { actions as projectsActions } from '../store/projects/projects.slice';

const rootActions = {
    ...userActions,
    ...projectsActions,
};

const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export default useActions;
