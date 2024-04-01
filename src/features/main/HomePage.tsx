/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "react-router-dom";
import {
  getAgrupacionesEstudiantiles,
  obtenerTopAgrupaciones,
} from "../../api/Agrupaciones";

import Card from "../../ui/Card";

import MainPageComponent from "./MainPageComponent";
import Carrousel from "./Carrousel";
import { useEffect, useState } from "react";
import Top4 from "./Top4";
import {
  UsersIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";

interface Agrupacion {
  id: string;
  estudiantes_registrados: string[];
  foto_agrupacion: string;
  mision: string;
  nombre_agrupacion: string;
  redes_sociales: string[];
  vision: string;
  tag: string;
  puntuacion: number;
  puntuaciones?: number[];
}

const HomePage: React.FC = () => {
  const [nombreFiltro, setNombreFiltro] = useState("");
  const [puntajeFiltro, setPuntajeFiltro] = useState("Todos");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const { agrupaciones = [] } = useLoaderData() as {
    agrupaciones: Agrupacion[];
  };
  const [topAgrupaciones, setTopAgrupaciones] = useState([] as Agrupacion[]);
  const [agrupacionesFiltradas, setAgrupacionesFiltradas] =
    useState(agrupaciones);

  const images = [
    "https://www.unimet.edu.ve/wp-content/uploads/2024/03/FOTOS-FERIA-DE-EMPLEO-2024-6-980x653.jpg",
    "https://www.unimet.edu.ve/wp-content/uploads/2024/03/FOTOS-DE-CONVERSATORIO-DE-TINOCO-2-980x653.jpg",
    "https://www.unimet.edu.ve/wp-content/uploads/2024/03/FOTOS-DE-CONVERSATORIO-DE-TINOCO-5-980x653.jpg",
    "https://www.unimet.edu.ve/wp-content/uploads/2024/03/FOTOS-CONVERSATORIO-DE-NIXON-8-980x653.jpg",
    "https://www.unimet.edu.ve/wp-content/uploads/2024/03/FOTOS-CONVERSATORIO-DE-NIXON-4-980x653.jpg",
  ];

  useEffect(() => {
    const cargarTopAgrupaciones = async () => {
      try {
        const agrupaciones = await obtenerTopAgrupaciones();
        setTopAgrupaciones(agrupaciones);
      } catch (error) {
        console.error("Error al cargar las top agrupaciones:", error);
      }
    };

    cargarTopAgrupaciones();
  }, []);

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
    <div className="bg-white" id="hola">
      <MainPageComponent />
      <div className="w-full lg:mt-32 mt-12 ">
        <h3 className="text-center lg:text-6xl text-3xl   ">
          <span id="Agrupaciones" className="font-bold text-black">
            {" "}
            CONOZCA NUESTRAS{" "}
          </span>{" "}
          <br />
          <span className="text-primary font-medium">AGRUPACIONES</span>
        </h3>
      </div>
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
            <option>Tecnología</option>
            <option>Ciencia</option>
            <option>Música</option>
            <option>Debate</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto mt-10 p-7">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-x justify-items-center">
          {agrupacionesFiltradas.map((agrupacion: Agrupacion) => (
            <Card
              key={agrupacion.id}
              puntaje={agrupacion.puntuacion}
              id={agrupacion.id}
              foto_agrupacion={agrupacion.foto_agrupacion}
              mision={agrupacion.mision}
              tag={agrupacion.tag}
              nombre_agrupacion={agrupacion.nombre_agrupacion}
            />
          ))}
        </div>
      </div>

      {agrupacionesFiltradas.length === 0 && (
        <h1 className="text-center text-5xl mb-36 font-bold text-primary">
          No se encontró la agrupación :c
        </h1>
      )}

      <div>
        <h4
          className="text-center mt-10 text-6xl text-primary font-semibold mb-5 "
          id="Noticias"
        >
          NOTICIAS
        </h4>
        <div
          className="bg-blue-50 drop-shadow-2xl p-3"
          style={{ boxSizing: "border-box" }}
        >
          <Carrousel images={images}></Carrousel>
        </div>
        <div className=" w-full h-10 mt-24 ">
          <h3 className="text-center text-4xl font-bold text-primary" 
          id="Top4">
            Top 4 agrupaciones
          </h3>
          <p className="text-center bg-white  text-gray-500 font-light mt-6 ">
            Estas son las 4 agrupaciones con la mayor cantidad de eugenios
          </p>
          <Top4 agrupaciones={topAgrupaciones} />
        </div>
      </div>
    </div>
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
export default HomePage;
