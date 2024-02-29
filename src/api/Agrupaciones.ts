import { db } from "../firebase/firebase.ts";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
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

export { getAgrupacionesEstudiantiles };
