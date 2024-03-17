import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getAgrupacionById } from "../../api/Agrupaciones";
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
}

export default function AgrupacionPage() {
  const data = useLoaderData() as Agrupacion;

  return (
    <div className="overflow-hidden bg-white py-32">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {data.nombre_agrupacion}
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              {data.mision}
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {data.vision}
            </p>
            <div className="mt-10 flex">
              <a
                href="#"
                className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Unete<span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <img
                src={data.foto_agrupacion}
                alt=""
                className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
              />
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
      return agrupacion;
    }
  } catch (error) {
    console.log(error);
  }
}
