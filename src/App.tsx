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
import { UserLayout, loader as userLoader } from "./features/user/UserLayout";
import {
  AdminLayout,
  loader as adminLoader,
} from "./features/admin/AdminLayout";
import {
  CrearAgrupacion,
  action as groupAction,
} from "./features/admin/CrearAgrupacion";

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
              loader: userLoader,

              children: [
                {
                  path: "/profile",
                  element: <Profile />,
                  action: ProfieAction,
                },
                {
                  path: "/mis-agrupaciones",
                  element: <div>mis-agrupaciones</div>,
                },
                {
                  path: "/buscar-agrupaciones",
                  element: <div>Dashboard</div>,
                },
              ],
            },
            {
              element: <AdminLayout />,
              loader: adminLoader,
              children: [
                {
                  path: "/crear-agrupacion",
                  element: <CrearAgrupacion />,
                  action: groupAction,
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
