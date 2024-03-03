import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import fetchStudentByEmail from "../../api/Estudiantes";
import { updateUser } from "../user/userSlice";

const AppLayout: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const email = currentUser.email || "";
        fetchStudentByEmail(db, email).then((student) => {
          console.log(student);
          dispatch(updateUser(student));
        });
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
/* const email = currentUser.email || "";
const student = await fetchStudentByEmail(db, email); */
