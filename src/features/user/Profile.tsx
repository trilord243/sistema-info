import { Form } from "react-router-dom";
import ProfileUI from "../../ui/ProfileUI";

import ProfileBannerPhoto from "./ProfileBannerPhoto";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import {
  getUserApellido,
  getUserId,
  getUserName,
  getUserSobreMi,
} from "./userSlice";

type ActionParams = {
  request: Request;
};
export default function Profile() {
  const nombre = useSelector(getUserName);
  const apellido = useSelector(getUserApellido);
  const sobreMi = useSelector(getUserSobreMi);
  const id = useSelector(getUserId);

  return (
    <div className="">
      <ProfileBannerPhoto />
      <div className="text-center lg:hidden mt-8">
        <ProfileUI />
      </div>
      <div className="w-full h-full flex lg:justify-between   ">
        <div className="flex-2 hidden lg:block  ">
          <ProfileUI />
        </div>

        <div className="flex-1   justify-center lg:justify-normal  ">
          <Form method="POST" className="flex flex-col lg:ml-14 px-6  ">
            <div className="space-y-12 ">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="asdasdasd@gmail"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nombre
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="nombre"
                          id="nombre"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="janesmith"
                          defaultValue={nombre}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Apellido
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="apellido"
                          id="apellidp"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="janesmith"
                          defaultValue={apellido}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Sobre mi
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="sobre_mi"
                        name="sobre_mi"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={sobreMi}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Escrieb una breve descipción sobre ti.
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Foto
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Cambiar
                      </button>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Foto de portada
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Sube tu foto de portada </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">O arrastrala </p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG de hasta 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <input type="hidden" name="id" value={id} />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 mb-3">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Salvar
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }: ActionParams) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  return null;
}
