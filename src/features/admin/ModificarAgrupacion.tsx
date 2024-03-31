import { PhotoIcon } from "@heroicons/react/24/outline";

import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { ChangeEvent, useState } from "react";
import Loader from "../../ui/loader/Loader";
import { getAgrupacionById } from "../../api/Agrupaciones";
import { LoaderFunctionArgs } from "react-router-dom";
type ActionParams = {
  request: Request;
};
import { doc, updateDoc } from "firebase/firestore";

export interface Agrupacion {
  id: string;
  estudiantes_registrados: string[];
  foto_agrupacion: string;
  mision: string;
  nombre_agrupacion: string;
  redes_sociales: string[];
  vision: string;
  tag: string;
  fecha_creacion: Timestamp;
  puntuacion: number;
}

export interface Timestamp {
  nanoseconds: number;
  seconds: number;
}
export const ModificarAgrupacion = () => {
  const loader = useLoaderData() as Agrupacion | undefined;

  const navigata = useNavigation();

  const isSubmiting = navigata.state === "submitting";

  const [coverPhoto, setcoverPhoto] = useState(loader?.foto_agrupacion);

  const handleFileChangeProfile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setcoverPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isSubmiting && <Loader message="Subiendo datos agrupacion..." />}

      <div className="w-full h-full flex  ">
        <div className="w-full h-full   ">
          <div className="w-full  p-9 mb-">
            <h3 className="lg:text-4xl text-3xl text-center font-bold mb-2 text-primary ">
              {loader?.nombre_agrupacion || "Crear agrupacion"}
            </h3>
            <p className="text-lg text-gray-500 font-normal leading-7  text-center">
              Modifica la agrupacion con la informacion que desees
            </p>
          </div>

          <Form encType="multipart/form-data" action="#" method="PUT">
            <input
              type="hidden"
              name="agrupacion-id"
              value={loader?.id || ""}
            />
            <div className="w-full flex flex-col items-center ">
              <div>
                <label
                  htmlFor="nombre-agrupacion"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre de la agrupacion
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="nombre-agrupacion"
                    id="nombre-agrupacion"
                    className="block  w-60 rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Club de moda"
                    defaultValue={loader?.nombre_agrupacion || ""}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="tag-agrupacion"
                  className="block text-sm font-medium leading-6 mt-3 text-gray-900"
                >
                  Tag de la agrupacion
                </label>
                <select
                  id="tag-agrupacion"
                  name="tag-agrupacion"
                  className="block w-52 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={loader?.tag || "Social"}
                >
                  <option>Social</option>
                  <option>Tecnologia</option>
                  <option>Ciencia</option>
                  <option>Musica</option>
                  <option>Debate</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col px-7 w-full">
              <div>
                <label
                  htmlFor="mision"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mision
                </label>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    name="mision"
                    id="mision"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={loader?.mision || ""}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="vision"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Vision
                </label>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    name="vision"
                    id="vision"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={loader?.vision || ""}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Foto de portada
                </label>
                <div
                  style={{
                    backgroundImage: "url(" + (coverPhoto || " ") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="mt-2 flex justify-center rounded-lg border border-dashed  border-gray-900/25 px-6 py-10"
                >
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-secondary"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="cover-photo"
                        className="relative cursor-pointer rounded-md  font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span className="">Sube tu foto de portada </span>
                        <input
                          id="cover-photo"
                          name="cover-photo"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleFileChangeProfile(e)}
                        />
                      </label>
                      <p className="pl-1 text-white font-bold ">
                        O arrastrala{" "}
                      </p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600 font-semibold">
                      PNG, JPG de hasta 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-10 mr-7 mb-3">
              <Link
                to="/administrar-agrupaciones"
                className="text-sm font-semibold leading-6 text-gray-500 hover:text-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export async function action({ request }: ActionParams) {
  const formData = await request.formData();
  const nombreAgrupacion = formData.get("nombre-agrupacion")?.toString();
  const tag = formData.get("tag-agrupacion")?.toString();
  const mision = formData.get("mision")?.toString();
  const vision = formData.get("vision")?.toString();
  const fileEntry = formData.get("cover-photo");
  const agrupacionId = formData.get("agrupacion-id")?.toString();

  try {
    let photoURL: string;

    if (fileEntry instanceof File && fileEntry.size > 0) {
      const storageRef = ref(
        storage,
        `agrupaciones/${agrupacionId}/${fileEntry.name}`
      );
      await uploadBytes(storageRef, fileEntry);
      photoURL = await getDownloadURL(storageRef);
    } else {
      const agrupacionExistente = await getAgrupacionById(agrupacionId ?? "");
      photoURL = agrupacionExistente?.foto_agrupacion ?? "";
    }

    const agrupacionRef = doc(
      db,
      "agrupaciones_estudiantiles",
      agrupacionId ?? ""
    );
    await updateDoc(agrupacionRef, {
      nombre_agrupacion: nombreAgrupacion,
      tag,
      mision,
      vision,
      foto_agrupacion: photoURL,
    });

    return redirect("/administrar-agrupaciones");
  } catch (error) {
    console.error("Error al actualizar la agrupación: ", error);
    return { error: "Error al actualizar la agrupación." };
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    if (typeof params.id === "string") {
      const data = await getAgrupacionById(params.id);
      return data;
    }
    return new Error("El ID proporcionado no es válido");
  } catch (error) {
    console.error(error);
    return new Error("Error al cargar los datos de la agrupación");
  }
}
