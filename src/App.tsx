import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./features/layout/AppLayout";
import ErrorPage from "./ui/ErrorPage";
import HomePage, { loader as menuLoader } from "./features/main/HomePage";
import Login, { action as loginAction } from "./features/login-register/Login";
import Register, {
  action as registerAction,
} from "./features/login-register/Register";
import { ProtectedRoute } from "./features/layout/ProtectedRoute";
import Profile, { action as ProfieAction } from "./features/user/Profile";

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login />, action: loginAction },
    { path: "/register", element: <Register />, action: registerAction },
    {
      element: <AppLayout />,

      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage />, loader: menuLoader },

        {
          element: <ProtectedRoute />,
          children: [
            { path: "/profile", element: <Profile />, action: ProfieAction },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
