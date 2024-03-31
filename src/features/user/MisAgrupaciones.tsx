import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAgrupacionById } from "../../api/Agrupaciones";
import { getUserAgrupaciones } from "./userSlice";
import { NoMember } from "./NoMember";
import { UserCardAgrupacion } from "./UserCardAgrupacion";

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
}

export const MisAgrupaciones = () => {
  const membresia = useSelector(getUserAgrupaciones);
  const [agrupaciones, setAgrupaciones] = useState<Agrupacion[]>([]);

  useEffect(() => {
    const cargarAgrupaciones = async () => {
      try {
        const promesas = membresia.map((id) => getAgrupacionById(id));
        const resultados = await Promise.all(promesas);
        setAgrupaciones(
          resultados.filter(
            (result) => !(result instanceof Error)
          ) as Agrupacion[]
        );
      } catch (error) {
        console.error("Error al cargar agrupaciones:", error);
      }
    };

    if (membresia.length > 0) {
      cargarAgrupaciones();
    }
  }, [membresia]);

  if (membresia.length === 0) {
    return <NoMember />;
  }

  return (
    <div className="h-screen  lg:mt-28 mt-14">
      <div className="  lg:w-[60rem]   lg:mx-auto mb-11 ">
        <h2 className="text-center text-2xl px-5 lg:text-3xl ">
          Puntua tus agrupaciones, colabora con ellos via paypal y ve los
          miembros de tus{" "}
          <span className="text-primary font-bold"> Agrupaciones </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7  justify-items-center mt-3 ">
        {agrupaciones.map((agrupacion) => (
          <UserCardAgrupacion
            key={agrupacion.id}
            dashed={true}
            foto_agrupacion={agrupacion.foto_agrupacion}
            mision={agrupacion.mision}
            tag={agrupacion.tag}
            nombre_agrupacion={agrupacion.nombre_agrupacion}
            id={agrupacion.id}
            estudiantes_registrados={agrupacion.estudiantes_registrados}
          />
        ))}
      </div>
    </div>
  );
};
