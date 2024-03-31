import { db } from "../firebase/firebase.ts";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  getDoc,
} from "firebase/firestore";

interface Agrupacion {
  id: string;
}

interface Agrupaciona {
  id: string;
  estudiantes_registrados: string[];
  foto_agrupacion: string;
  mision: string;
  nombre_agrupacion: string;
  redes_sociales: string[];
  vision: string;
  tag: string;
  puntuacion: number;
  puntuaciones?: [];
}

const getAgrupacionesEstudiantiles = async (): Promise<
  Agrupacion[] | Error
> => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "agrupaciones_estudiantiles")
    );
    const agrupacionesList: Agrupacion[] = querySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Agrupacion)
    );
    return agrupacionesList;
  } catch (error) {
    console.error("Error al obtener las agrupaciones estudiantiles:", error);
    return new Error("Error al obtener las agrupaciones estudiantiles");
  }
};

const getAgrupacionById = async (id: string): Promise<Agrupaciona | null> => {
  try {
    const docRef = doc(db, "agrupaciones_estudiantiles", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Agrupaciona;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la agrupación:", error);
    return null;
  }
};

export { getAgrupacionesEstudiantiles, getAgrupacionById };
