/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLoaderData } from "react-router-dom";
import CardAgrupacionAdmin from "./CardAgrupacionAdmin";
import { getAgrupacionesEstudiantiles } from "../../api/Agrupaciones";
import { ModalEliminate } from "./ModalEliminate";
import { useEffect, useState } from "react";
import Succes from "./Succes";
export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}
export interface Agrupacion {
  id: string;
  estudiantes_registrados: string[];
  foto_agrupacion: string;
  mision: string;
  nombre_agrupacion: string;
  redes_sociales: string[];
  vision: string;
  tag: string;
  fecha_creacion: Timestamp;
  puntuacion: number;
}

export interface AgrupacionCard {
  id: string;
  foto_agrupacion: string;
  mision: string;
  nombre_agrupacion: string;
  tag: string;
  fecha_creacion: Timestamp;
  estudiantes_registrados: string[];
  setModal: (value: boolean) => void;
  setNombreAgrupacion: (value: string) => void;
  setId: (value: string) => void;
}

export const AdminAgrupaciones = () => {
  const [agrupaciones, setAgrupaciones] = useState<Agrupacion[]>([]);

  const [modal, setModal] = useState(false);
  const [nombreAgrupacion, setNombreAgrupacion] = useState("");
  const [id, setId] = useState("");
  const [success, setShowSuccess] = useState(false);

  const cargarAgrupaciones = async () => {
    try {
      const resultado = await getAgrupacionesEstudiantiles();
      if (resultado instanceof Error) {
        console.error(resultado.message);
        setAgrupaciones([]);
      } else {
        setAgrupaciones(resultado as Agrupacion[]);
      }
    } catch (error) {
      console.error("Error cargando las agrupaciones estudiantiles:", error);
      setAgrupaciones([]);
    }
  };

  useEffect(() => {
    cargarAgrupaciones();
  }, [modal, id]);

  return (
    <>
      {modal && (
        <ModalEliminate
          id={id}
          setId={setId}
          nombre_agrupacion={nombreAgrupacion}
          modal={modal}
          setModal={setModal}
          setNombreAgrupacion={setNombreAgrupacion}
          setShowSuccess={setShowSuccess}
        />
      )}

      {success && <Succes />}
      <div>
        <div>
          <h3 className="text-center font-bold mt-12 text-4xl">
            Agrupaciones <span className="text-primary">UNIMET</span>
          </h3>
        </div>

        <div className="flex lg:justify-between flex-col lg:flex-row justify-center items-center lg:gap-0 gap-6 mt-6 lg:px-36 2xl:px-80 mb-7 lg:mt-5">
          <div>
            <label
              htmlFor="tag"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Filtrar por categoria
            </label>
            <select
              id="tag"
              name="tag"
              className="mt- block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
              defaultValue="Todos"
            >
              <option>Todos</option>
              <option>Tecnologia</option>
              <option>Social</option>
              <option>Ciencia</option>
            </select>
          </div>

          <Link
            to="/crear-agrupacion"
            type="button"
            className="inline-flex items-center gap-x-2 rounded-md bg-secondary px-2 h-10 mt-auto   text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Crear agrupacion
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-x-0 justify-items-center 2xl:px-60 lg:px-12">
          {agrupaciones.map((agrupacion) => (
            <CardAgrupacionAdmin
              setId={setId}
              setNombreAgrupacion={setNombreAgrupacion}
              setModal={setModal}
              id={agrupacion.id}
              key={agrupacion.id}
              foto_agrupacion={agrupacion.foto_agrupacion}
              mision={agrupacion.mision}
              nombre_agrupacion={agrupacion.nombre_agrupacion}
              tag={agrupacion.tag}
              fecha_creacion={agrupacion.fecha_creacion}
              estudiantes_registrados={agrupacion.estudiantes_registrados}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export async function loader(): Promise<
  { agrupaciones: Agrupacion[] } | { error: string }
> {
  try {
    const agrupaciones = await getAgrupacionesEstudiantiles();
    if (agrupaciones instanceof Error) {
      console.error(agrupaciones.message);

      return { error: agrupaciones.message };
    }

    return { agrupaciones: agrupaciones as Agrupacion[] };
  } catch (error: any) {
    console.error("Error cargando las agrupaciones estudiantiles:", error);
    return { error: error.message || "Error desconocido" };
  }
}
