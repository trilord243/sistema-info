import { onAuthStateChanged } from "firebase/auth";

import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import fetchStudentByEmail from "../../api/Estudiantes";

export const UserLayout = () => {
  const loading = useLoaderData();
  console.log(loading);
  return (
    <>
      <Outlet />
    </>
  );
};

export async function loader() {
  const checkAuth = new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        unsubscribe();
        if (currentUser) {
          fetchStudentByEmail(db, currentUser?.email ?? "").then((student) => {
            if (student?.rol === "admin") {
              resolve(redirect("/"));
              resolve(null);
            } else {
              resolve(null);
            }
          });
        } else {
          resolve(null);
        }
      },
      reject
    );
  });

  return checkAuth.catch((error) => {
    console.error("Error checking auth state", error);
    return null;
  });
}
