import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext.jsx'

import Navbar from "./components/Navbar.jsx"
import Todo from "./pages/Todo.jsx"
import Home from "./pages/Home.jsx"

function App() {

  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={user ? <Todo /> : <Navigate to="/login" />} />
            <Route path='/login' element={!user ? <Home /> : <Navigate to='/' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
