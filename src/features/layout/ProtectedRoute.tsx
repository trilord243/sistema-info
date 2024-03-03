import { Outlet, redirect } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export const ProtectedRoute = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const checkAuth = new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        unsubscribe();
        if (currentUser) {
          resolve(null);
        } else {
          resolve(redirect("/login"));
        }
      },
      reject
    );
  });

  return checkAuth.catch((error) => {
    console.error("Error checking auth state", error);
    return redirect("/login");
  });
}
