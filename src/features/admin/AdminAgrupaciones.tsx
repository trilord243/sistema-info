/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import CardAgrupacionAdmin from "./CardAgrupacionAdmin";
import { getAgrupacionesEstudiantiles } from "../../api/Agrupaciones";
import { ModalEliminate } from "./ModalEliminate";
import { useEffect, useState } from "react";
import Succes from "./Succes";
import {
  MagnifyingGlassCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
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
  const [estudiantesFiltro, setEstudiantesFiltro] = useState("Todos");

  const [modal, setModal] = useState(false);
  const [nombreAgrupacion, setNombreAgrupacion] = useState("");
  const [id, setId] = useState("");
  const [success, setShowSuccess] = useState(false);
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [puntajeFiltro, setPuntajeFiltro] = useState("Todos");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [agrupacionesFiltradas, setAgrupacionesFiltradas] =
    useState(agrupaciones);
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

  useEffect(() => {
    let filtradas = agrupaciones;

    if (nombreFiltro) {
      filtradas = filtradas.filter((agrupacion) =>
        agrupacion.nombre_agrupacion
          .toLowerCase()
          .includes(nombreFiltro.toLowerCase())
      );
    }

    if (puntajeFiltro !== "Todos") {
      filtradas = filtradas.filter(
        (agrupacion) => agrupacion.puntuacion === parseInt(puntajeFiltro)
      );
    }

    if (categoriaFiltro !== "Todos") {
      filtradas = filtradas.filter(
        (agrupacion) => agrupacion.tag === categoriaFiltro
      );
    }

    if (estudiantesFiltro !== "Todos") {
      filtradas = filtradas.filter((agrupacion) =>
        estudiantesFiltro === "Con estudiantes"
          ? agrupacion.estudiantes_registrados.length > 0
          : agrupacion.estudiantes_registrados.length === 0
      );
    }

    setAgrupacionesFiltradas(filtradas);
  }, [
    nombreFiltro,
    puntajeFiltro,
    categoriaFiltro,
    agrupaciones,
    estudiantesFiltro,
  ]);

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
          <div className="flex lg:flex-row flex-col lg:px-0 px-5 justify-center gap-16 mt-10 ">
            <div>
              <label
                htmlFor="estudiantes"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Filtrar por agrupaciones vacías
              </label>
              <select
                id="estudiantes"
                name="estudiantes"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Todos"
                onChange={(e) => setEstudiantesFiltro(e.target.value)}
              >
                <option>Todos</option>
                <option>Con estudiantes</option>
                <option>Vacíos</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="puntaje"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Filtrar por puntaje
              </label>
              <select
                id="puntaje"
                name="puntaje"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Todos"
                onChange={(e) => setPuntajeFiltro(e.target.value)}
              >
                <option>Todos</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Buscar agrupación
              </label>
              <div className="mt-2 flex rounded-md shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UsersIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="nombre"
                    name="nombre"
                    id="nombre"
                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Metrotech"
                    onChange={(e) => setNombreFiltro(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="relative hover:bg-primary -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 "
                >
                  <MagnifyingGlassCircleIcon
                    className="-ml-0.5 h-7 w-7 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="categoria"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Categoria
              </label>
              <select
                id="categoria"
                name="categoria"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue="Todos"
                onChange={(e) => setCategoriaFiltro(e.target.value)}
              >
                <option>Todos</option>
                <option>Social</option>
                <option>Tecnologia</option>
                <option>Ciencia</option>
                <option>Musica</option>
                <option>Debate</option>
              </select>
            </div>
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
          {agrupacionesFiltradas.map((agrupacion) => (
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
