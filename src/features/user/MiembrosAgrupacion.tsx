import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getAgrupacionById } from "../../api/Agrupaciones";

import { db } from "../../firebase/firebase";
import { fetchStudentById } from "../../api/Estudiantes";
interface Agrupaciona {
  id: string;
  estudiantes_registrados: string[];
  foto_agrupacion: string;
  mision: string;
  nombre_agrupacion: string;
  redes_sociales: string[];
  vision: string;
  tag: string;
  puntuacion: number;
}

export interface Student {
  email: string;
  apellido: string;
  banner: string;
  imagen_perfil: string;
  nombre: string;
  rol: string;
  sobre_ti: string;
  agrupaciones: string[];
  foto?: string;
}
export const MiembrosAgrupacion = () => {
  const { estudiantesRegistrados } = useLoaderData() as {
    agrupacion: Agrupaciona;
    estudiantesRegistrados: Student[] | [];
  };

  return (
    <div className="bg-white py-6 sm:py-11">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-center content-center      lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-primary text-center sm:text-4xl">
            Miembros Registrados
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
            Estas son todas las agrupaciones que se han registrado en la
            plataforma
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {estudiantesRegistrados.map((person: Student) => (
            <li key={person.email}>
              <img
                className="mx-auto h-24 w-24 rounded-full"
                src={person.imagen_perfil}
                alt=""
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {person.nombre === person.apellido
                  ? person.nombre
                  : person.nombre + " " + person.apellido}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    if (typeof params.id === "string") {
      const agrupacion = (await getAgrupacionById(params.id)) as Agrupaciona;

      if (agrupacion && agrupacion.estudiantes_registrados) {
        const estudiantesPromesas = agrupacion.estudiantes_registrados.map(
          (estudianteId) => fetchStudentById(db, estudianteId) // Asumiendo que tienes una instancia de Firestore llamada 'db'
        );

        // Esperar a que todas las promesas se resuelvan
        const estudiantes = await Promise.all(estudiantesPromesas);

        const estudiantesRegistrados = estudiantes.filter(
          (estudiante) => estudiante !== null
        );

        return { agrupacion, estudiantesRegistrados };
      } else {
        return { agrupacion, estudiantesRegistrados: [] };
      }
    }
  } catch (error) {
    console.error("Error al cargar la agrupación y sus miembros:", error);
    throw new Error("Error al cargar la agrupación y sus miembros");
  }
}
