import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import fetchStudentByEmail from "../../api/Estudiantes";

const AppLayout: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const email = currentUser.email || "";
        const student = await fetchStudentByEmail(db, email);
        console.log(student);
      }
    });
  }, [dispatch]);

  const showNavbar = location.pathname !== "/profile";
  return (
    <>
      {showNavbar && (
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      )}
      <Outlet />
    </>
  );
};

export default AppLayout;
