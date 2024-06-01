import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />
    </Route>
  ));


  return (
    <RouterProvider router={router} />
  );
}

export default App;
