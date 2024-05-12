import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<div>Login</div>} />
      <Route path='register' element={<div>Register</div>} />
    </Route>
  ))


  return (
    <RouterProvider router={router} />
  )
}

export default App
