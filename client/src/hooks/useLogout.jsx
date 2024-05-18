import { useAuthContext } from './useAuthContext.jsx'
import { useTasksContext } from './useTasksContext.jsx'

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: TasksDispatch } = useTasksContext();
    const logout = () => {
        // Remove User from local storage
        localStorage.removeItem('user');

        // Dispatch LOGOUT action
        dispatch({type: 'LOGOUT'})
        TasksDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}