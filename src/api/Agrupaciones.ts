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

export const getAgrupacionById = async (
  id: string
): Promise<Agrupacion | Error> => {
  try {
    const docRef = doc(db, "agrupaciones_estudiantiles", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Agrupacion;
    } else {
      console.error(
        "No se encontró la agrupación estudiantil con el ID proporcionado."
      );
      return new Error("Agrupación estudiantil no encontrada");
    }
  } catch (error) {
    console.error("Error al obtener la agrupación estudiantil:", error);
    return new Error("Error al obtener la agrupación estudiantil");
  }
};

export { getAgrupacionesEstudiantiles };
