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
  const { agrupaciones = [] } = useLoaderData() as {
    agrupaciones: Agrupacion[];
  };
  const [topAgrupaciones, setTopAgrupaciones] = useState([] as Agrupacion[]);

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
  return (
    <div className="bg-gray-50" id="hola">
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

      <div className="container mx-auto mt-10 p-7">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-x justify-items-center">
          {agrupaciones.map((agrupacion: Agrupacion) => (
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
          <h3 className="text-center text-4xl font-bold text-primary">
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
