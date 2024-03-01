import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
const AppLayout: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        console.log(currentUser);
      }
    });
  }, [dispatch]);

  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default AppLayout;
