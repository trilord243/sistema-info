/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "react-router-dom";
import { getAgrupacionesEstudiantiles } from "../../api/Agrupaciones";

import Card from "../../ui/Card";

import MainPageComponent from "./MainPageComponent";

interface Agrupacion {
  id: string;
  estudiantes_registradors: string[];
  foto_agrupacion: string;
  mision: string;
  nombre_agrupacion: string;
  redes_sociales: string[];
  vision: string;
  tag: string;
}

const HomePage: React.FC = () => {
  const { agrupaciones = [] } = useLoaderData() as {
    agrupaciones: Agrupacion[];
  };
  console.log(agrupaciones);

  return (
    <>
      <MainPageComponent />
      <div className="w-full lg:mt-32 mt-12">
        <h3 className="text-center lg:text-6xl text-3xl   ">
          <span className="font-bold text-black"> CONOZCA NUESTRAS </span>{" "}
          <br />
          <span className="text-primary font-medium">AGRUPACIONES</span>
        </h3>
      </div>

      <div className="container mx-auto mt-10 p-7">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-x justify-items-center">
          {agrupaciones.map((agrupacion: Agrupacion) => (
            <Card
              key={agrupacion.id}
              foto_agrupacion={agrupacion.foto_agrupacion}
              mision={agrupacion.mision}
              tag={agrupacion.tag}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-center mt-10 text-6xl text-primary font-semibold mb-5 ">
          NOTICIAS
        </h4>

        <div className="mt-2 w-full h-[35rem] bg-blue-500"></div>
        <div className=" w-full h-10 mt-24 bg-red-600"></div>
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
export default HomePage;
