import { Outlet, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export const ProtectedRoute = () => {
  const [go, setGo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setGo(true);
      } else {
        console.log("no hay usuario");
        setGo(false);
        navigate("/login");
      }
    });
  }, [navigate]);

  if (go === false) return null;
  return (
    <>
      <Outlet />
    </>
  );
};
