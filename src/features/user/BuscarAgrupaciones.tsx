import { useLoaderData } from "react-router-dom";
import { UserCardAgrupacion } from "./UserCardAgrupacion";
import { Timestamp } from "firebase/firestore";

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
  return (
    <div>
      <h3 className="text-center font-semibold text-3xl my-12">
        Busca las agrupaciones que mas te gusten y
        <br />
        <span className="text-primary font-bold">¡UNETE!</span>
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-x justify-items-center mt-3">
        {agrupaciones.map((agrupacion: Agrupacion) => (
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
