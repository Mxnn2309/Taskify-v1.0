import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import { TasksContextProvider } from './context/TaskContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="154768159616-r91hf6st4553lpj213fnjc1ekpe3vfrg.apps.googleusercontent.com">
      <AuthContextProvider>
        <TasksContextProvider>
          <App />
        </TasksContextProvider>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);