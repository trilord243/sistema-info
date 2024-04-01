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
import {
  AdminAgrupaciones,
  loader as adminGroupLoader,
} from "./features/admin/AdminAgrupaciones";
import AgrupacionPage, {
  loader as agrupacionIdLoader,
} from "./features/agrupacion/AgrupacionPage";
import {
  ModificarAgrupacion,
  action as modicarAction,
  loader as modificarLoader,
} from "./features/admin/ModificarAgrupacion";

import { MisAgrupaciones } from "./features/user/MisAgrupaciones";
import { BuscarAgrupaciones } from "./features/user/BuscarAgrupaciones";
import UsuariosRegistrados, {
  loader as registerUserLoader,
} from "./features/admin/UsariosRegistrados";
import {
  MiembrosAgrupacion,
  loader as memberLoader,
} from "./features/user/MiembrosAgrupacion";
import "./index.css";
function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      action: loginAction,
      loader: loginLoader,
    },
    { path: "/test", element: <Test /> },
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
          path: "/agrupacion/:id",
          element: <AgrupacionPage />,
          loader: agrupacionIdLoader,
        },

        {
          element: <ProtectedRoute />,
          loader: protectedLoader,
          children: [
            {
              path: "/miembros-agrupacion/:id",
              element: <MiembrosAgrupacion />,
              loader: memberLoader,
            },
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
                  element: <MisAgrupaciones />,
                },

                {
                  path: "/buscar-agrupaciones",
                  element: <BuscarAgrupaciones />,
                  loader: menuLoader,
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
                {
                  path: "/administrar-agrupaciones",
                  element: <AdminAgrupaciones />,
                  loader: adminGroupLoader,
                },
                {
                  path: "/actualizar-agrupacion/:id",
                  element: <ModificarAgrupacion />,
                  action: modicarAction,
                  loader: modificarLoader,
                },

                {
                  path: "/registro-usuario",
                  element: <UsuariosRegistrados />,
                  loader: registerUserLoader,
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
