import { db } from "../firebase/firebase.ts";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  getDoc,
  doc,
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

const getAgrupacionById = async (id: string): Promise<Agrupacion | Error> => {
  try {
    const docRef = doc(db, "agrupaciones_estudiantiles", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Agrupacion;
    } else {
      throw new Error("No existe una agrupación con el ID proporcionado");
    }
  } catch (error) {
    console.error("Error al obtener la agrupación:", error);
    return new Error("Error al obtener la agrupación");
  }
};

export { getAgrupacionesEstudiantiles, getAgrupacionById };
