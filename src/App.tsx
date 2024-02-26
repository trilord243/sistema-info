import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./features/layout/AppLayout";
import ErrorPage from "./ui/ErrorPage";
import HomePage from "./features/main/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [{ path: "/", element: <HomePage /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
