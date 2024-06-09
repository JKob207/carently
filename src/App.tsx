import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom';

import AuthRequired from './components/AuthRequired';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route element={<AuthRequired />}>
        <Route path='firstLogin' element={<h1>First login</h1>} />
        <Route path='dashboard' element={<h1>Test</h1>} />
      </Route>
    </Route>
  ));


  return (
    <RouterProvider router={router} />
  );
}

export default App;
