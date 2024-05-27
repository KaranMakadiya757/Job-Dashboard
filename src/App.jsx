import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Registeration from './components/Registeration';
import Dashboard from './components/Dashboard';
import { AuthGuard, LoginAuth } from './components/Guard';

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginAuth><Login /></LoginAuth>
  },
  {
    path: '/register',
    element: <LoginAuth><Registeration /></LoginAuth>
  },
  {
    path: '/dashboard',
    // element: <AuthGuard><Dashboard /></AuthGuard>
    element: <Dashboard />
  },
])

export default App