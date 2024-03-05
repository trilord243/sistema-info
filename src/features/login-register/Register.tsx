import imagen from "../assets/image 11.jpeg";
import arrow from "../assets/Arrow.svg";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import store from "../../store";
import { updateUser } from "../user/userSlice";
import Loader from "../../ui/loader/Loader";

type ActionParams = {
  request: Request;
};

interface ActionErrors {
  message?: string;
}
const Register = () => {
  const formErrors = useActionData();
  const navigate = useNavigation();
  const isSubmiting = navigate.state === "submitting";

  return (
    <>
      {isSubmiting && <Loader />}

      <div className="h-screen w-screen bg-gradient-to-t from-blue-300 via-blue-100 to-transparent flex justify-center items-center">
        <div className="bg-white w-3/4 h-5/6 rounded-3xl shadow-xl shadow-gray-500/50 flex ">
          <div className="flex min-h-full flex-1">
            <div className="flex flex-1 flex-col justify-center  px-4  py-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="mx-auto w-full max-w-sm lg:w-96  ">
                <div>
                  <Link to="/">
                    <img
                      className="h-10 w-auto"
                      src={arrow}
                      alt="Your Company"
                    />
                  </Link>
                  <h2 className=" text-center mt-3 text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
                    REGISTRATE
                  </h2>
                  <p className="text-center mt-1 mb-2">
                    Empieza con una agrupacion!
                  </p>
                </div>
                {(formErrors as ActionErrors)?.message && (
                  <p className="text-center text-red-400 ">
                    {(formErrors as ActionErrors)?.message}
                  </p>
                )}

                <div className="">
                  <div>
                    <Form method="POST" className="space-y-6">
                      <div>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block mx-auto w-3/4 bg-[#DDE5Ff]  rounded-md border-0 py-1.5 shadow-sm  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Correo estudiantil "
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block mx-auto w-3/4 bg-[#DDE5Ff] rounded-md border-0 py-1.5 shadow-sm  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Contraseña"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mt-2">
                          <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block mx-auto w-3/4 bg-[#DDE5Ff] rounded-md border-0 py-1.5 shadow-sm  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder=" Verificacion Contraseña"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex mx-auto w-1/3 justify-center rounded-md bg-primary px-3    bg-gradient-to-r from-[#253A80] to-[#5038ED]  py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Registrate
                        </button>
                      </div>
                    </Form>
                  </div>

                  <div className="mt-2">
                    <div className="relative">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-white px-6 text-gray-900 font-bold text-xl mt-5">
                          Registrate con
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 mx-auto gap-4">
                      <a
                        href="#"
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50 focus-visible:ring-transparent"
                      >
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                            fill="#EA4335"
                          />
                          <path
                            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                            fill="#34A853"
                          />
                        </svg>
                        <span className="text-sm font-semibold leading-6">
                          Registrate con
                          <span className="font-bold"> google</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={imagen}
                alt="iMAGEN"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;

export async function action({ request }: ActionParams) {
  const errors: ActionErrors = {};
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirm-password")?.toString();

    if (password !== confirmPassword) {
      errors.message =
        "Las contraseñas no coinciden Ingrese si contraseña nuevamente";
      return errors;
    }

    if (!email || !password) {
      errors.message = "Email y contraseña son requeridos";
      return errors;
    }

    if (password.length < 6) {
      errors.message = "La contraseña debe tener al menos 6 caracteres";
      return errors;
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const uid = userCredential.user.uid;
    const student = {
      agrupaciones: [],
      id: uid,
      email: email,
      nombre: email,
      apellido: email,
      rol: "usuario",
      sobre_ti: "Me encanta la unimet!",
      banner:
        "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      imagen_perfil:
        "https://firebasestorage.googleapis.com/v0/b/sistema-info-d52b6.appspot.com/o/Avatar%20profile.png?alt=media&token=f15c43a4-663d-464b-8499-911c6196a684",
    };

    await setDoc(doc(db, "estudiantes", uid), student);
    store.dispatch(updateUser(student));
    return redirect("/profile");
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message === "Firebase: Error (auth/email-already-in-use)."
        ? (errors.message = "El correo ya esta en uso")
        : (errors.message = error.message);
    }

    return errors;
  }
}
