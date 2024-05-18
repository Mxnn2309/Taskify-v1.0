import { TasksContext } from "../context/TaskContext.jsx";
import { useContext } from "react";

export const useTasksContext = () => {
    const context = useContext(TasksContext);

    if(!context) {
        throw new Error('useTasksContext must be used within a TasksProvider')
    }

    return context
}