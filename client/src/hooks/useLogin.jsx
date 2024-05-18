import { useAuthContext } from './useAuthContext.jsx';

export const useLogin = () => {
    const { dispatch } = useAuthContext();

    const login = async (email) => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
    
            if (!response.ok) {
                throw new Error('Failed to login');
            }
    
            const json = await response.json();
    
            if (!json) {
                throw new Error('Invalid response from server');
            }
    
            // Save the JWT to local storage
            localStorage.setItem('user', JSON.stringify(json));
    
            dispatch({ type: 'LOGIN', payload: json });
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    return { login };
};
