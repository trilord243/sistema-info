import { Form } from "react-router-dom";

export const CrearAgrupacion = () => {
  return (
    <div className="h-full w-full flex">
      <div className="bg-blue-500 w-full h-full flex flex-col justify-center items-center">
        <div>
          <h2>Crear agrupación</h2>
          <p>Escribe toda la información que necesitas de la agrupación</p>
        </div>
        <Form action="#" method="POST" className="w-full max-w-xs">
          <div className="mt-6">
            <label
              htmlFor="nombre-agrupacion"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nombre de agrupación
            </label>
            <input
              type="text"
              name="nombre-agrupacion"
              id="nombre-agrupacion"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Club de lectura"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Location
            </label>
            <select
              id="location"
              name="location"
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue="Canada"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
        </Form>
      </div>

      <div className="w-full h-full bg-red-500">
        <img src="" alt="asdasd" />
      </div>
    </div>
  );
};
