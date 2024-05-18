import { createContext, useReducer } from 'react';

export const TasksContext = createContext();

export const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            };
        case 'CREATE_TASK':
            return {
                tasks: [...state.tasks, action.payload]
            };
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter(task => task._id !== action.payload._id)
            };
        case 'UPDATE_TASK':
            return {
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task)
            };
        default:
            return state;
    }
};

export const TasksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer( taskReducer, {
        tasks: []
    })

    return(
        <TasksContext.Provider value={{...state, dispatch}}>
            { children }
        </TasksContext.Provider>
    )
}