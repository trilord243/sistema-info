import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import ProfileUI from "../../ui/ProfileUI";

import ProfileBannerPhoto from "./ProfileBannerPhoto";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import {
  getBannerImage,
  getUserApellido,
  getUserEmail,
  getUserId,
  getUserImagenPerfil,
  getUserName,
  getUserSobreMi,
  updateUser,
} from "./userSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import store from "../../store";
import { ChangeEvent, useState } from "react";
import Loader from "../../ui/loader/Loader";
import SuccessModal from "../../ui/SuccessModal";

type ActionParams = {
  request: Request;
};

type ActionData = {
  mensaje?: string;
};

export default function Profile() {
  const email = useSelector(getUserEmail);
  const nombre = useSelector(getUserName);
  const apellido = useSelector(getUserApellido);
  const sobreMi = useSelector(getUserSobreMi);
  const id = useSelector(getUserId);
  const navigate = useNavigate();
  const profilePhoto = useSelector(getUserImagenPerfil);
  const banner = useSelector(getBannerImage);
  const navigate1 = useNavigation();
  const isSubmiting = navigate1.state === "submitting";

  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [coverPhoto, setcoverPhoto] = useState<string | null>(null);
  const formData = useActionData() as ActionData | undefined;

  const isFormdata = formData?.mensaje === "Perfil actualizado";

  const handleFileChangeProfile = (
    event: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          type === "profile"
            ? setPreviewPhoto(reader.result)
            : setcoverPhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      {isSubmiting && <Loader message="Guardando cambios perfil" />}

      {isFormdata && <SuccessModal />}
      <ProfileBannerPhoto />

      <div className="text-center lg:hidden mt-8">
        <ProfileUI />
      </div>
      <div className="w-full h-full flex lg:justify-between   ">
        <div className="flex-2 hidden lg:block  ">
          <ProfileUI />
        </div>

        <div className="flex-1   justify-center lg:justify-normal  ">
          <Form
            method="POST"
            encType="multipart/form-data"
            className="flex flex-col lg:ml-14 px-6  "
          >
            <div className="space-y-12 ">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    {/* {isFormdata && (
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xl mb-6 font-medium text-green-700  ">
                        Se cambio exitosamente
                      </span>
                    )} */}
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
                          readOnly
                          className="block flex-1 border-0 bg-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="usuario@correo.unimet.edu.ve"
                          value={email}
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
                          placeholder="Ramón"
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
                          placeholder="DelaSoledadPalacios"
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
                      Escribe una breve descripción sobre ti.
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Foto de perfíl
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      {/*  <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      /> */}
                      <img
                        src={previewPhoto || profilePhoto}
                        className="h-16 w-16 rounded-full"
                        alt="Profile foto"
                      />
                      <label
                        htmlFor="profile-photo"
                        className="relative cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Cambiar
                        <input
                          id="profile-photo"
                          name="profile-photo"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) =>
                            handleFileChangeProfile(e, "profile")
                          }
                        />
                      </label>
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
                        backgroundImage: "url(" + (coverPhoto || banner) + ")",
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
                              onChange={(e) =>
                                handleFileChangeProfile(e, "cover")
                              }
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
              </div>

              <div>
                <input type="hidden" name="id" value={id} />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 mb-3">
              <button
                onClick={() => {
                  navigate("/");
                }}
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
  const id = formData.get("id")?.toString();
  const nombre = formData.get("nombre")?.toString();
  const apellido = formData.get("apellido")?.toString();
  const sobreMi = formData.get("sobre_mi")?.toString();
  const profilePhotoFile = formData.get("profile-photo");
  const coverPhotoFile = formData.get("cover-photo");

  /*   console.log(profilePhotoFile);
  console.log(coverPhotoFile); */
  if (!id) {
    console.error("ID no proporcionado");
    return null;
  }

  try {
    const studentRef = doc(db, "estudiantes", id);
    const studentDoc = await getDoc(studentRef);
    if (!studentDoc.exists()) {
      console.error("El documento del estudiante no existe");
      return null;
    }
    const studentData = studentDoc.data();
    /*  console.log(
      profilePhotoFile instanceof File,
      coverPhotoFile instanceof File
    ); */

    // Subir y actualizar la foto de perfil
    if (profilePhotoFile instanceof File && profilePhotoFile.name !== "") {
      const profilePhotoRef = ref(storage, `estudiantes/${id}/profile-photo`);
      const uploadResult = await uploadBytes(profilePhotoRef, profilePhotoFile);
      if (uploadResult) {
        const profilePhotoURL = await getDownloadURL(profilePhotoRef);
        studentData.imagen_perfil = profilePhotoURL;
        /*  console.log("La URL de la foto de perfil es:", profilePhotoURL); */
      } else {
        console.error("La subida de la foto de perfil ha fallado");
      }
    }

    // Subir y actualizar la foto de portada
    if (coverPhotoFile instanceof File && coverPhotoFile.name !== "") {
      const coverPhotoRef = ref(storage, `estudiantes/${id}/cover-photo`);
      const uploadResult = await uploadBytes(coverPhotoRef, coverPhotoFile);
      if (uploadResult) {
        const coverPhotoURL = await getDownloadURL(coverPhotoRef);
        studentData.banner = coverPhotoURL;
      } else {
        console.error("La subida de la foto de portada ha fallado");
      }
    }

    // Actualizar los datos del estudiante
    await updateDoc(studentRef, {
      nombre: nombre || studentData.nombre,
      apellido: apellido || studentData.apellido,
      sobre_ti: sobreMi || studentData.sobre_ti,
      imagen_perfil: studentData.imagen_perfil,
      banner: studentData.banner,
    });

    store.dispatch(
      updateUser({
        id: id,
        nombre: nombre || studentData.nombre,
        apellido: apellido || studentData.apellido,
        sobre_mi: sobreMi || studentData.sobre_ti,
        imagen_perfil: studentData.imagen_perfil,
        banner: studentData.banner,
      })
    );

    return { mensaje: "Perfil actualizado" };
  } catch (error) {
    console.error("Error al actualizar el perfil del estudiante:", error);
  }

  return null;
}
