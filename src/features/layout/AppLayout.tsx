import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import fetchStudentByEmail from "../../api/Estudiantes";
import { resetUserState, updateEmail, updateUser } from "../user/userSlice";
import { updateAdmin } from "../admin/adminSlice";
import { MobileNavbar } from "../../ui/MobileNavbar";
import { UserMobileNavbar } from "../../ui/UserMobileNavbar";

const AppLayout: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [userType, setUserType] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const email = currentUser.email || "";
        fetchStudentByEmail(db, email).then((student) => {
          if (student?.rol === "admin") {
            dispatch(updateAdmin(student?.nombre));
            setUserType("admin");
          } else {
            dispatch(updateEmail(email));
            dispatch(updateUser(student));
            setUserType("student");
          }
        });
      } else {
        dispatch(resetUserState());
        setUserType("");
      }
    });
  }, [dispatch]);

  const isAdmin = userType === "admin";
  const isUser = userType === "student";

  const showNavbar = location.pathname !== "/profile";
  return (
    <>
      {showNavbar && (
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
      )}
      <div className="text-black">
        <Outlet />
      </div>

      <div className="bottom-0 z-50 sticky ">
        {isAdmin && <MobileNavbar />}
        {isUser && <UserMobileNavbar />}
      </div>
    </>
  );
};

export default AppLayout;

export async function loader() {
  return null;
}
