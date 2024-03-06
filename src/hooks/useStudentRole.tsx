import { useState, useEffect } from "react";

import { auth, db } from "../firebase/firebase";
import fetchStudentByEmail, { Student } from "../api/Estudiantes";

export function useStudentRole() {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser?.email) {
        fetchStudentByEmail(db, currentUser.email)
          .then((studentData) => {
            setStudent(studentData);
            setIsLoading(false);
          })
          .catch((err) => {
            setError(err);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return { student, isLoading, error };
}
