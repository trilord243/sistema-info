import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout, { loader as layoutLoader } from "./features/layout/AppLayout";
import ErrorPage from "./ui/ErrorPage";
import HomePage, { loader as menuLoader } from "./features/main/HomePage";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./features/login-register/Login";
import Register, {
  action as registerAction,
} from "./features/login-register/Register";
import {
  ProtectedRoute,
  loader as protectedLoader,
} from "./features/layout/ProtectedRoute";

import Profile, { action as ProfieAction } from "./features/user/Profile";
import { Test } from "./ui/Test";
import { UserLayout } from "./features/user/UserLayout";
import { AdminLayout } from "./features/admin/AdminLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      action: loginAction,
      loader: loginLoader,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/register",
      element: <Register />,
      action: registerAction,
      loader: loginLoader,
    },
    {
      element: <AppLayout />,
      loader: layoutLoader,

      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage />, loader: menuLoader },

        {
          element: <ProtectedRoute />,
          loader: protectedLoader,
          children: [
            {
              element: <UserLayout />,

              children: [
                {
                  path: "/profile",
                  element: <Profile />,
                  action: ProfieAction,
                },
              ],
            },
            {
              element: <AdminLayout />,
              children: [
                {
                  path: "/admin",
                  element: <div>Admin</div>,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
