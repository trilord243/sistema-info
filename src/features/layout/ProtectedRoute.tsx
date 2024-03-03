import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserLogin } from "../user/userSlice";

export const ProtectedRoute = () => {
  const login = useSelector(getUserLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  if (!login) return null;
  return (
    <>
      <Outlet />
    </>
  );
};
