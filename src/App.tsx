import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./features/layout/AppLayout";
import ErrorPage from "./ui/ErrorPage";
import HomePage, { loader as menuLoader } from "./features/main/HomePage";
import Login from "./features/login-register/Login";

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [{ path: "/", element: <HomePage />, loader: menuLoader }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
