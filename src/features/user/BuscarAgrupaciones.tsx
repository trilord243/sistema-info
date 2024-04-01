import { useLoaderData } from "react-router-dom";
import { UserCardAgrupacion } from "./UserCardAgrupacion";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

interface Agrupacion {
  id: string;
  estudiantes_registradors: string[];
  foto_agrupacion: string;
  mision: string;
  nombre_agrupacion: string;
  redes_sociales: string[];
  vision: string;
  tag: string;
  puntuacion: number;
  fecha_creacion: Timestamp;
}

export const BuscarAgrupaciones = () => {
  const { agrupaciones = [] } = useLoaderData() as {
    agrupaciones: Agrupacion[];
  };
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [puntajeFiltro, setPuntajeFiltro] = useState("Todos");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [agrupacionesFiltradas, setAgrupacionesFiltradas] =
    useState(agrupaciones);

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

    setAgrupacionesFiltradas(filtradas);
  }, [nombreFiltro, puntajeFiltro, categoriaFiltro, agrupaciones]);

  return (
    <div>
      <h3 className="text-center font-semibold text-3xl my-12">
        Busca las agrupaciones que más te gusten y
        <br />
        <span className="text-primary font-bold">¡UNETE!</span>
      </h3>
      <div className="flex lg:flex-row flex-col lg:px-0 px-5 justify-center gap-16 mt-10 ">
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
            Categoría
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-x justify-items-center mt-3">
        {agrupacionesFiltradas.map((agrupacion: Agrupacion) => (
          <UserCardAgrupacion
            key={agrupacion.id}
            foto_agrupacion={agrupacion.foto_agrupacion}
            mision={agrupacion.mision}
            tag={agrupacion.tag}
            nombre_agrupacion={agrupacion.nombre_agrupacion}
            id={agrupacion.id}
            estudiantes_registrados={agrupacion.estudiantes_registradors}
          />
        ))}
      </div>
    </div>
  );
};
