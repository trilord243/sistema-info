import {
  collection,
  query,
  where,
  getDocs,
  Firestore,
  doc,
  getDoc,
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
  foto?: string;
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
      /* console.log("No se encontró un estudiante con ese email."); */
      return null;
    }
  } catch (error) {
    console.error("Error al buscar el estudiante:", error);
    throw new Error("Error al buscar el estudiante");
  }
}

export default fetchStudentByEmail;

export async function fetchStudents(db: Firestore): Promise<Student[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "estudiantes"));
    const students: Student[] = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as unknown as Student;
    });
    return students;
  } catch (error) {
    console.error("Error al buscar los estudiantes:", error);
    throw new Error("Error al buscar los estudiantes");
  }
}

export async function fetchStudentById(
  db: Firestore,
  id: string
): Promise<Student | null> {
  try {
    const studentRef = doc(db, "estudiantes", id);
    const docSnapshot = await getDoc(studentRef);

    if (docSnapshot.exists()) {
      const studentData = docSnapshot.data() as Student;
      return studentData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al buscar el estudiante por ID:", error);
    throw new Error("Error al buscar el estudiante por ID");
  }
}
