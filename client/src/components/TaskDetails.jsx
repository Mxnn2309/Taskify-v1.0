import { useState } from 'react';
import { useTasksContext } from "../hooks/useTasksContext.jsx";
import { useAuthContext } from '../hooks/useAuthContext.jsx';

const TaskDetails = ({ task }) => {
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();
    const [completed, setCompleted] = useState(task.complete);

    const deleteTask = async () => {
        if (!user) {
            console.error('User not logged in');
            return;
        }
        try {
            const response = await fetch('/tasks/' + task._id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
    
            if (response.status === 401) {
                console.error('Unauthorized access');
                return;
            }
    
            const json = await response.json();
    
            if (!response.ok) {
                throw new Error(json.error);
            }
    
            dispatch({ type: 'DELETE_TASK', payload: json });
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    const completeTask = async () => {
        if (!user) {
            console.error('User not logged in');
            return;
        }
        try {
            const response = await fetch(`/tasks/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ complete: !completed })
            });
    
            if (response.status === 401) {
                console.error('Unauthorized access');
                return;
            }
    
            if (response.ok) {
                const updatedTask = await response.json();
                setCompleted(updatedTask.complete);
                dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
            }
        } catch (error) {
            console.error('Error completing task:', error.message);
        }
    };

    return (
        <div className={"task-details " + (completed ? "is-complete" : "")}>
            <input type="checkbox" className="checkbox" checked={completed} onChange={completeTask} />
            <div className="text">
                <h4>{task.title}</h4>
                <p>{task.desc}</p>
            </div>
            <div>
                <span onClick={deleteTask}><ion-icon name="trash-outline" size="large"></ion-icon></span>
            </div>
        </div>
    );
}

export default TaskDetails;
