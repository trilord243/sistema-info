import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import fetchStudentByEmail from "../../api/Estudiantes";
import { resetUserState, updateEmail, updateUser } from "../user/userSlice";
import { updateAdmin } from "../admin/adminSlice";

const AppLayout: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        const email = currentUser.email || "";
        fetchStudentByEmail(db, email).then((student) => {
          if (student?.rol === "admin") {
            dispatch(updateAdmin(student?.nombre));
          } else {
            dispatch(updateEmail(email));
            dispatch(updateUser(student));
          }
        });
      } else {
        dispatch(resetUserState());
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

export async function loader() {
  return null;
}
