import { useLoaderData } from "react-router-dom";
import { fetchStudents } from "../../api/Estudiantes";
import { db } from "../../firebase/firebase";
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
  id: string;
  role: string;
}
export default function UsuariosRegistrados() {
  const data = useLoaderData() as Student[];

  return (
    <div className="bg-white py-6 sm:py-11">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-center content-center      lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-primary text-center sm:text-4xl">
            Miembros Registrados
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
            Éstas son todas las agrupaciones que se han registrado en la
            plataforma
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
        >
          {data.map((person: Student) => (
            <li key={person.id}>
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
              <p className="text-sm leading-6 text-gray-600">{person.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function loader() {
  try {
    const estudiantes = await fetchStudents(db);

    return estudiantes;
  } catch (error) {
    console.log(error);
    return null;
  }
}
