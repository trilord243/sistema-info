import { Link, useNavigate } from "react-router-dom";
import { formatTimestampToDate } from "../../utils/DateConverter";
import { AgrupacionCard } from "./AdminAgrupaciones";

const CardAgrupacionAdmin: React.FC<AgrupacionCard> = ({
  setNombreAgrupacion,
  foto_agrupacion,
  mision,
  nombre_agrupacion,
  tag,
  fecha_creacion,
  id,
  estudiantes_registrados,
  setModal,
  setId,
}) => {
  const agrupacionesVacias = estudiantes_registrados.length === 0;
  const navigate = useNavigate();
  const deleteButton = () => {
    setModal(true);
    setNombreAgrupacion(nombre_agrupacion);
    setId(id);
  };

  return (
    <div className="card w-80  shadow-xl">
      <figure className="h-48">
        <img
          className="w-full h-full object-cover"
          src={foto_agrupacion}
          alt="Shoes"
        />
      </figure>

      <div className="card-body p-3">
        <div className="flex justify-between">
          <div>
            <p className="text-primary font-semibold">{tag}</p>
          </div>

          {agrupacionesVacias && (
            <div>
              {" "}
              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                <svg
                  className="h-1.5 w-1.5 fill-red-500"
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx={3} cy={3} r={3} />
                </svg>
                Grupo vacio
              </span>
            </div>
          )}
        </div>
        <div className="flex w-full  justify-between">
          <div>
            <h2 className="text-black font-semibold">{nombre_agrupacion}</h2>
          </div>

          <div>
            <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              <svg
                className="h-1.5 w-1.5 fill-blue-500"
                viewBox="0 0 6 6"
                aria-hidden="true"
              >
                <circle cx={3} cy={3} r={3} />
              </svg>
              Creado {formatTimestampToDate(fecha_creacion)}
            </span>
          </div>
        </div>

        <p className="text-sm line-clamp-3 text-black mb-3 mt-5">{mision}</p>

        <div
          className={`flex justify-between ${
            agrupacionesVacias ? "flex-row-reverse" : ""
          }  my-4 `}
        >
          {!agrupacionesVacias ? (
            <Link
              to={`/miembros-agrupacion/${id}`}
              className="rounded-md bg-blue-600 px-2 py-1  text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex justify-center items-center"
            >
              Ver miembros
            </Link>
          ) : (
            <button
              onClick={deleteButton}
              type="button"
              className="rounded-md bg-red-600 px-2 py-1  text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Eliminar agrupación
            </button>
          )}
          <button
            type="button"
            className="rounded-md bg-green-600 px-2 py-1  text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={() => navigate(`/actualizar-agrupacion/${id}`)}
          >
            Actualizar datos
          </button>
        </div>
      </div>
    </div>
  );
};
export default CardAgrupacionAdmin;
