import { Link } from "react-router-dom";
import CardAgrupacionAdmin from "./CardAgrupacionAdmin";

export const AdminAgrupaciones = () => {
  return (
    <div>
      <div>
        <h3 className="text-center font-bold mt-6 text-4xl">
          Agrupaciones <span className="text-primary">UNIMET</span>
        </h3>
      </div>

      <div className="flex lg:justify-between flex-col lg:flex-row justify-center items-center lg:gap-0 gap-6 mt-6 lg:px-20 mb-7 lg:mt-5">
        <div>
          <label
            htmlFor="tag"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Filtrar por categoria
          </label>
          <select
            id="tag"
            name="tag"
            className="mt- block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6"
            defaultValue="Todos"
          >
            <option>Todos</option>
            <option>Tecnologia</option>
            <option>Social</option>
            <option>Ciencia</option>
          </select>
        </div>

        <Link
          to="/crear-agrupacion"
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-secondary px-2 h-10 mt-auto   text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Crear agrupacion
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-x justify-items-center">
        <CardAgrupacionAdmin />
        <CardAgrupacionAdmin />
        <CardAgrupacionAdmin />
        <CardAgrupacionAdmin />
        <CardAgrupacionAdmin />
        <CardAgrupacionAdmin />
        <CardAgrupacionAdmin />
        <CardAgrupacionAdmin />
      </div>
    </div>
  );
};
