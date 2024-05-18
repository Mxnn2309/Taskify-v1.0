import { useState } from 'react';
import { useTasksContext } from '../hooks/useTasksContext.jsx';
import { useAuthContext } from '../hooks/useAuthContext.jsx';

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();

    const addTask = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in');
            return;
        }
        const task = { title, desc };
        try {
            const response = await fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(task)
            });
    
            const json = await response.json();
            
            if (!response.ok) {
                setError(json.error);
                setEmptyFields(json.emptyFields || []);
            } else {
                setTitle('');
                setDesc('');
                setError(null);
                setEmptyFields([]);
                console.log('New Task Added');
                dispatch({ type: 'CREATE_TASK', payload: json });
            }
        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };

    return (
        <div className="form-container">
            <form className="form-input" onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />
                <input
                    type="text"
                    placeholder="Description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className={emptyFields.includes('desc') ? 'error' : ''}
                />
                <button className='button'>Add Task</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default TaskForm;
