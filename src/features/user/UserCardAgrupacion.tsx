import { useNavigate } from "react-router-dom";
import { Paypal } from "../../ui/Paypal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface StudentCardProps {
  foto_agrupacion: string;
  mision: string;
  tag: string;
  nombre_agrupacion: string;
  id: string;
  estudiantes_registrados: string[];
  dashed?: boolean;
}

const UserCardAgrupacion: React.FC<StudentCardProps> = ({
  foto_agrupacion,
  mision,
  id,
  estudiantes_registrados,
  nombre_agrupacion,
  dashed = false,
}) => {
  console.log(estudiantes_registrados);
  const navigate = useNavigate();

  if (!dashed) {
    return (
      <div className="card w-80   bg-white shadow-2xl">
        <figure className="h-48 p-4 ">
          <img
            className="w-full h-full rounded-2xl object-cover shadow-lg"
            src={foto_agrupacion}
            alt={nombre_agrupacion}
          />
        </figure>

        <div className="card-body p-3">
          <h2 className="text-black text-2xl text-center font-semibold">
            {nombre_agrupacion}
          </h2>

          <p className="text-sm line-clamp-3 text-black mb-3 mt-2">{mision}</p>
          <div className="flex justify-between px-4">
            <button
              onClick={() => navigate(`/agrupacion/${id}`)}
              type="button"
              className="rounded-md bg-orange-600 px-2 py-1 mb-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Mas informacion
            </button>

            <button
              onClick={() => navigate(`/agrupacion/${id}`)}
              type="button"
              className="rounded-md bg-green-600 px-2 py-1 mb-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Unete!
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card w-80   bg-white shadow-2xl">
        <figure className="h-48 p-4 ">
          <img
            className="w-full h-full rounded-2xl object-cover shadow-lg"
            src={foto_agrupacion}
            alt={nombre_agrupacion}
          />
        </figure>

        <div className="card-body p-3 flex justify-center ">
          <h2 className="text-black text-2xl text-center font-semibold">
            {nombre_agrupacion}
          </h2>

          <p className="text-sm line-clamp-3 text-black mb-3 mt-2">{mision}</p>
          <button
            onClick={() => navigate(`/agrupacion/${id}`)}
            type="button"
            className="rounded-md bg-orange-600 px-2 py-1 mb-3 h-12 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 w-36 mx-auto"
          >
            Ver miembros
          </button>

          <div className="flex justify-between items-center px-4 ">
            <Paypal height={24} weight={24} />

            <h3 className="font-bold text-secondary text-xl">
              Puntua! <FontAwesomeIcon icon={faArrowRight} />
            </h3>
          </div>
        </div>
      </div>
    );
  }
};
export { UserCardAgrupacion };
