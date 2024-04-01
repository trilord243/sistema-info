import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getAgrupacionById } from "../../api/Agrupaciones";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAgrupaciones,
  getUserId,
  updateAgrupaciones,
} from "../user/userSlice";
import { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
import { getIsLogged } from "../admin/adminSlice";
export interface Agrupacion {
  id: string;
  estudiantes_registradors: string[];
  foto_agrupacion: string;
  mision: string;
  nombre_agrupacion: string;
  redes_sociales: string[];
  vision: string;
  tag: string;
  puntuacion: number;
  fecha_creacion: string;
}

interface AgrupacionData {
  agrupacion: Agrupacion;
}

export default function AgrupacionPage() {
  const { agrupacion } = useLoaderData() as AgrupacionData;
  const params = useParams();
  const isLogged = useSelector(getIsLogged);
  console.log(isLogged);

  const idUser = useSelector(getUserId);
  const miembros = useSelector(getUserAgrupaciones);
  const [isMember, setIsMember] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (miembros.includes(agrupacion.id as never)) {
      setIsMember(true);
    }
  }, [miembros, agrupacion.id]);

  const handleJoinClub = async () => {
    if (!isMember) {
      const userRef = doc(db, "estudiantes", idUser);
      const groupRef = doc(db, "agrupaciones_estudiantiles", params.id ?? "");
      try {
        await updateDoc(userRef, {
          agrupaciones: arrayUnion(agrupacion.id),
        });
        await updateDoc(groupRef, {
          estudiantes_registrados: arrayUnion(idUser),
        });
        const array = [...miembros, agrupacion.id];
        dispatch(updateAgrupaciones(array));

        setIsMember(true);
      } catch (error) {
        console.error("Error al unirse al club:", error);
      }
    }
  };

  const handleDeleteClub = async () => {
    if (isMember) {
      const userRef = doc(db, "estudiantes", idUser);
      const groupRef = doc(db, "agrupaciones_estudiantiles", params.id ?? "");
      try {
        await updateDoc(userRef, {
          agrupaciones: arrayRemove(agrupacion.id),
        });
        await updateDoc(groupRef, {
          estudiantes_registrados: arrayRemove(idUser),
        });
        const array = miembros.filter((id) => id !== agrupacion.id);
        dispatch(updateAgrupaciones(array));

        setIsMember(false);
      } catch (error) {
        console.error("Error al unirse al club:", error);
      }
    }
  };

  return (
    <div className="overflow-hidden bg-white py-32">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {agrupacion.nombre_agrupacion}
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              {agrupacion.mision}
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {agrupacion.vision}
            </p>
            {isLogged ? (
              <div className="mt-10 flex">
                {!isMember ? (
                  <button
                    onClick={handleJoinClub}
                    className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Únete <span aria-hidden="true">&rarr;</span>
                  </button>
                ) : (
                  <div className="flex">
                    <button
                      onClick={handleDeleteClub}
                      className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Abandonar
                    </button>

                    <h1>Ya eres miembro!</h1>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-10">
                <Link
                  to="/login"
                  className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                >
                  Loggeate!
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <img
                src={agrupacion.foto_agrupacion}
                alt=""
                className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export async function loader({ params }: LoaderFunctionArgs) {
  try {
    if (typeof params.id === "string") {
      const agrupacion = await getAgrupacionById(params.id);

      return { agrupacion };
    }
  } catch (error) {
    console.log(error);
  }
}
