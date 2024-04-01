import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPuntuados,
  getUserAgrupaciones,
  getUserId,
  updateAgrupaciones,
} from "./userSlice";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { PaypalButton } from "../../ui/PaypalButton";

interface StudentCardProps {
  foto_agrupacion: string;
  mision: string;
  tag: string;
  nombre_agrupacion: string;
  id: string;
  estudiantes_registrados: string[];
  dashed?: boolean;
  setAgrupacionPuntuar?: (id: string) => void;
  setOpen?: (open: boolean) => void;
  email?: string;
}

const UserCardAgrupacion: React.FC<StudentCardProps> = ({
  foto_agrupacion,
  mision,
  id,
  nombre_agrupacion,
  dashed = false,
  email = "",
  setAgrupacionPuntuar = () => {},
  setOpen = () => {},
}) => {
  console.log(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const puntuados = useSelector(getPuntuados) || [];
  console.log(puntuados);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMember, setIsMember] = useState(false);
  const [isPuntaje, setIsPuntaje] = useState(false);
  const miembros = useSelector(getUserAgrupaciones);
  const idUser = useSelector(getUserId);
  const handlePuntaje = () => {
    setAgrupacionPuntuar(id);
    setOpen(true);
  };

  useEffect(() => {
    if (miembros.includes(id as never)) {
      setIsMember(true);
    }
    if (puntuados.includes(id as never)) {
      setIsPuntaje(true);
    }
  }, [miembros, id, puntuados]);

  const handleJoinClub = async () => {
    if (!isMember) {
      const userRef = doc(db, "estudiantes", idUser);
      const groupRef = doc(db, "agrupaciones_estudiantiles", id ?? "");
      try {
        await updateDoc(userRef, {
          agrupaciones: arrayUnion(id),
        });
        await updateDoc(groupRef, {
          estudiantes_registrados: arrayUnion(idUser),
        });
        const array = [...miembros, id];
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
      const groupRef = doc(db, "agrupaciones_estudiantiles", id ?? "");
      try {
        await updateDoc(userRef, {
          agrupaciones: arrayRemove(id),
        });
        await updateDoc(groupRef, {
          estudiantes_registrados: arrayRemove(idUser),
        });
        const array = miembros.filter((memberId) => memberId !== id);

        console.log(array);
        dispatch(updateAgrupaciones(array));

        setIsMember(false);
      } catch (error) {
        console.error("Error al unirse al club:", error);
      }
    }
  };

  if (!dashed) {
    return (
      <div className="card w-80   bg-white shadow-2xl">
        <figure className="h-48 p-4 ">
          <img
            className="w-full h-full rounded-2xl object-cover shadow-lg"
            src={foto_agrupacion}
            alt={nombre_agrupacion}
          />
        </figure>
        <div className="card-body p-3">
          <h2 className="text-black text-2xl text-center font-semibold">
            {nombre_agrupacion}
          </h2>

          <p className="text-sm line-clamp-3 text-black mb-3 mt-2">{mision}</p>
          <div className="flex justify-between px-4">
            {!isMember ? (
              <button
                onClick={() => navigate(`/agrupacion/${id}`)}
                type="button"
                className="rounded-md bg-orange-600 px-2 py-1 mb-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Mas informacion
              </button>
            ) : (
              <button
                onClick={handleDeleteClub}
                type="button"
                className="rounded-md bg-red-600 px-2 py-1 mb-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 h-9"
              >
                Salir agrupacion
              </button>
            )}

            {!isMember ? (
              <button
                onClick={handleJoinClub}
                type="button"
                className="rounded-md bg-green-600 px-2 py-1 mb-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 h-9"
              >
                ¡Unete!
              </button>
            ) : (
              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2  text-xs font-medium text-green-700">
                <svg
                  className="h-1.5 w-1.5 fill-green-500"
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx={3} cy={3} r={3} />
                </svg>
                Ya formas parte
              </span>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card w-80   bg-white shadow-2xl">
        <figure className="h-48 p-4 ">
          <img
            className="w-full h-full rounded-2xl object-cover shadow-lg"
            src={foto_agrupacion}
            alt={nombre_agrupacion}
          />
        </figure>

        <div className="card-body p-3 flex justify-center ">
          <h2 className="text-black text-2xl text-center font-semibold">
            {nombre_agrupacion}
          </h2>

          <p className="text-sm line-clamp-3 text-black mb-3 mt-2">{mision}</p>
          <Link
            to={`/miembros-agrupacion/${id}`}
            className=" flex items-center justify-center rounded-md bg-orange-600 px-2 py-1 mb-3 h-12 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 w-36 mx-auto"
          >
            Ver miembros
          </Link>

          <div className="flex justify-between items-center px-4 ">
            <PaypalButton
              totalValue="10.00"
              invoice="Donación para la agrupación XYZ"
              email={email}
            />

            {!isPuntaje ? (
              <button
                onClick={handlePuntaje}
                className="font-bold text-secondary text-xl"
              >
                Puntua! <FontAwesomeIcon icon={faArrowRight} />
              </button>
            ) : (
              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2  text-xs font-medium text-green-700">
                <svg
                  className="h-1.5 w-1.5 fill-green-500"
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx={3} cy={3} r={3} />
                </svg>
                Ya puntuase!
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
};
export { UserCardAgrupacion };
