import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getAgrupacionById } from "../../api/Agrupaciones";
import { useDispatch, useSelector } from "react-redux";
import {
  getPuntuados,
  getUserAgrupaciones,
  getUserId,
  getUserLogin,
  updateAgrupaciones,
} from "../user/userSlice";
import { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
import Modal from "../../ui/Modal";
import { PaypalButton } from "../../ui/PaypalButton";

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
  correo: string;
}

interface AgrupacionData {
  agrupacion: Agrupacion;
}
const notificationMethods = [
  { id: "5", title: "5$" },
  { id: "10", title: "10$" },
  { id: "15", title: "15$" },
  { id: "20", title: "20$" },
];
export default function AgrupacionPage() {
  const [selectedAmount, setSelectedAmount] = useState(
    notificationMethods[0].id
  );
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(event.target.value);
  };
  console.log(selectedAmount);

  const { agrupacion } = useLoaderData() as AgrupacionData;
  const params = useParams();
  const isLogged = useSelector(getUserLogin);
  const [isPuntaje, setIsPuntaje] = useState(false);
  const [open, setOpen] = useState(false);
  const idUser = useSelector(getUserId);
  const miembros = useSelector(getUserAgrupaciones);
  const [isMember, setIsMember] = useState(false);
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const puntuados = useSelector(getPuntuados) || [];

  useEffect(() => {
    if (miembros.includes(agrupacion.id as never)) {
      setIsMember(true);
    }
    if (puntuados.includes(params.id as never)) {
      setIsPuntaje(true);
    }
  }, [miembros, agrupacion.id, puntuados, params.id]);

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
      <Modal open={open} setOpen={setOpen} agrupacion={params.id ?? ""} />
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {agrupacion.nombre_agrupacion}
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              {agrupacion.mision}
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {agrupacion.vision}
            </p>
            {isLogged ? (
              <div className="mt-10 flex gap-7">
                {!isMember ? (
                  <button
                    onClick={handleJoinClub}
                    className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Únete <span aria-hidden="true">&rarr;</span>
                  </button>
                ) : (
                  <div className="flex gap-10">
                    <button
                      onClick={handleDeleteClub}
                      className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Abandonar
                    </button>

                    {!isPuntaje ? (
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Puntuar
                      </button>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-1.5 py-0.5 text-lf font-medium text-green-700">
                        Ya puntuaste!
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-10">
                <Link
                  to="/login"
                  className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                >
                  ¡Loggeate!
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
              {isMember && (
                <div className="mt-10">
                  <div>
                    <label className="text-base font-semibold text-gray-900">
                      <h2 className="mb-5 text-primary text-lg  font-bold text-center">
                        Si deseas contribuir Puedes contribuir mediante paypal
                      </h2>
                    </label>
                    <p className="text-sm text-gray-500">
                      Escoge la cantidad que deseas contribuir
                    </p>
                    <fieldset className="mt-4">
                      <legend className="sr-only">Notification method</legend>
                      <div className="space-y-4">
                        {notificationMethods.map((notificationMethod) => (
                          <div
                            key={notificationMethod.id}
                            className="flex items-center"
                          >
                            <input
                              id={notificationMethod.id}
                              name="notification-method"
                              type="radio"
                              value={notificationMethod.id}
                              onChange={handleAmountChange}
                              checked={selectedAmount === notificationMethod.id}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor={notificationMethod.id}
                              className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                            >
                              {notificationMethod.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  <PaypalButton
                    email={agrupacion.correo}
                    totalValue={selectedAmount}
                    invoice="Agrupacion"
                  />
                </div>
              )}
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
