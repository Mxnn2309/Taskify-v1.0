import { useEffect } from "react";

import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";

const Todo = () => {
    const { tasks, dispatch } = useTasksContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                if (!user) {
                    console.error('User not logged in');
                    return;
                }
                const response = await fetch('/tasks', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
        
                if (response.status === 401) {
                    console.error('Unauthorized access');
                    return;
                }
        
                const json = await response.json();
                
                if (response.ok) {
                    dispatch({ type: 'SET_TASKS', payload: json });
                }
            } catch (error) {
                console.error('Error fetching tasks:', error.message);
            }
        };
        

        fetchTasks();
    }, [dispatch, user]);

    return (
        <div className="todo">
            <TaskForm />
            <div className="tasks">
                {tasks && tasks.map((task) => (
                    <TaskDetails key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Todo;