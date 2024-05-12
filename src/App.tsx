import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<h1 className='text-3xl font-bold underline'>Login</h1>} />
      <Route path='register' element={<div>Register</div>} />
    </Route>
  ));


  return (
    <RouterProvider router={router} />
  );
}

export default App;
