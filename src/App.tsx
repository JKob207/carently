import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom';

import AuthRequired from './components/AuthRequired';
import Layout from './components/Layout';
import Calendar from './pages/Calendar/Calendar';
import CarPanel from './pages/CarPanel/CarPanel';
import CarsList from './pages/CarsList/CarsList';
import Dashboard from './pages/Dashboard/Dashboard';
import FirstLogin from './pages/FirstLogin/FirstLogin';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserPanel from './pages/UserPanel/UserPanel';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route element={<AuthRequired />}>
        <Route path='first-login' element={<FirstLogin />} />
        <Route path='dashboard' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='cars-list' element={<CarsList />} />
          <Route path='car/:carName' element={<CarPanel />} />
          <Route path='calendar' element={<Calendar />} />
          <Route path='user-panel' element={<UserPanel />} />
        </Route>
      </Route>
    </Route>
  ));


  return (
    <RouterProvider router={router} />
  );
}

export default App;
