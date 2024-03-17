import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRoute } from "./historySlice";

export const TrackRoute = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRoute(location.pathname));
  }, [location, dispatch]);

  return null;
};
