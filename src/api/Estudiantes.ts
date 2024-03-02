import {
  collection,
  query,
  where,
  getDocs,
  Firestore,
} from "firebase/firestore";

export interface Student {
  email: string;
  Apellido: string;
  banner: string;
  imagen_perfil: string;
  nombre: string;
  rol: string;
  sobre_ti: string;
  agrupaciones: string[];
}

export async function fetchStudentByEmail(
  db: Firestore,
  email: string
): Promise<Student | null> {
  try {
    const studentsRef = collection(db, "estudiantes");
    const q = query(studentsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const studentDoc = querySnapshot.docs[0];
      const studentData = studentDoc.data() as Student;

      return studentData;
    } else {
      console.log("No se encontró un estudiante con ese email.");
      return null;
    }
  } catch (error) {
    console.error("Error al buscar el estudiante:", error);
    throw new Error("Error al buscar el estudiante");
  }
}

export default fetchStudentByEmail;
