interface Agrupacion {
  nombre_agrupacion: string;
  foto_agrupacion: string;
  tag: string;
}

interface Top4Props {
  agrupaciones: Agrupacion[];
}

export default function Top4({ agrupaciones }: Top4Props) {
  return (
    <div className="bg-white pt-11 ">
      <div className="  mx-auto max-w-7xl px-6 text-center lg:px-8">
        <ul
          role="list"
          className="  mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {agrupaciones.map((agrupacion) => (
            <li key={agrupacion.nombre_agrupacion}>
              <img
                className="mx-auto h-56 w-56 rounded-full"
                src={agrupacion.foto_agrupacion}
                alt=""
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {agrupacion.nombre_agrupacion}
              </h3>
              <p className="text-sm leading-6 text-gray-600">
                {agrupacion.tag}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
