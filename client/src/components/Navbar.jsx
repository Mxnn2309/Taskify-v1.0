import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin.jsx';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout.jsx';
import { useAuthContext } from '../hooks/useAuthContext.jsx';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
    const [email, setEmail] = useState('');
    const { login } = useLogin();
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const decodedResponse = jwtDecode(credentialResponse.credential);
            const email = decodedResponse.email;
            setEmail(email);
            await login(email);
        } catch (error) {
            console.error('Google login failed:', error);
        }
    };

    return (
        <header>
            <div className='container'>
                <Link to="/">
                    <h1>Taskify</h1>
                </Link>
                <nav>
                    {user ? (
                        <div className='container'>
                            <span className='email'>{user.email}</span>
                            <button onClick={handleClick} className='button'>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={(error) => {
                                    console.error('Login Failed:', error);
                                }}
                            />
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
