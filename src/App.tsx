import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom';

import AuthRequired from './components/AuthRequired';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import FirstLogin from './pages/FirstLogin/FirstLogin';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route element={<AuthRequired />}>
        <Route path='first-login' element={<FirstLogin />} />
        <Route path='dashboard' element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
    </Route>
  ));


  return (
    <RouterProvider router={router} />
  );
}

export default App;
