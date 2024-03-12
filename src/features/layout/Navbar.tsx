import { Fragment, useEffect, useReducer, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoUnimet from "../assets/unimet-blanco.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUserImagenPerfil, resetUserState } from "../user/userSlice";
import { getProhilePhoto, logout } from "../admin/adminSlice";
import fetchStudentByEmail from "../../api/Estudiantes";

type State = {
  login: boolean;
  navigation: { name: string; href: string; current: boolean }[];
  admin: boolean;
};

type Action = { type: "login" | "logout" | "admin" };

const loginNavigation = [
  { name: "Mis agrupaciones", href: "#", current: false },
  { name: "Buscar Agrupaciones", href: "#", current: false },
  { name: "Principal", href: "#", current: false },
];

const adminNavigation = [
  { name: "Agrupaciones", href: "administrar-agrupaciones", current: false },
  { name: "Crear agrupacion", href: "crear-agrupacion", current: false },
  { name: "Ver registro de usuarios", href: "/all-user", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const event = useDispatch();

  const resetProfile = () => {
    signOut(auth);
    event(logout());
    event(resetUserState());
  };
  const navigate = useNavigate();
  /*   const adminLogged = useSelector(getIsLogged);
  const isuserLogged = useSelector(userLogged);
 */
  const imagenPerfilUser = useSelector(getUserImagenPerfil);
  const imagenPerfilAdmin = useSelector(getProhilePhoto);

  const [image, setImage] = useState(imagenPerfilUser);

  const initialState: State = {
    login: false,
    navigation: [
      { name: "Agrupaciones", href: "#", current: false },
      { name: "Noticias", href: "#", current: false },
      { name: "Top 4 agrupaciones", href: "#", current: false },
    ],
    admin: false,
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "login":
        return { ...state, navigation: [...loginNavigation], login: true };
      case "logout":
        return { ...initialState, login: false };
      case "admin":
        return { navigation: [...adminNavigation], login: true, admin: true };

      default:
        return state;
    }
  }

  const [{ login, navigation, admin }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      fetchStudentByEmail(db, currentUser?.email ?? "").then((student) => {
        setImage(student?.imagen_perfil || "");

        if (student?.rol === "admin") {
          setImage(student?.foto || "");
          return null;
        }
      });
      if (currentUser?.email === "admin@admin.com") {
        dispatch({ type: "admin" });

        return null;
      }

      if (currentUser) {
        dispatch({ type: "login" });
      } else {
        dispatch({ type: "logout" });
      }
    });
  }, [dispatch, imagenPerfilAdmin]);

  return (
    <Disclosure
      as="nav"
      className="bg-primary  custom-shadow border border-solid border-black "
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <Link to="/">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-16 w-auto"
                      src={logoUnimet}
                      alt="Your Company"
                    />
                  </div>
                </Link>
                <div className="hidden sm:ml-6  sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "bg-blue-950 text-white"
                              : "text-gray-300 hover:bg-blue-950 hover:text-white"
                          } rounded-md px-3 py-2 text-sm font-medium`
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              {!login ? (
                <div className=" absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Link
                    to="login"
                    className="hidden md:block lg:block  text-white"
                  >
                    {" "}
                    Iniciar sesion
                  </Link>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div className="">
                      <div className="hidden md:block lg:block  text-white">
                        <Link
                          to="/register"
                          className=" w-full h-full py-2 px-4 rounded-md bg-secondary "
                        >
                          Registrate!
                        </Link>
                      </div>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={image}
                          alt="Images user"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {!admin && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={"/profile"}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              onClick={resetProfile}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          {!login ? (
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col  gap-3">
                <Disclosure.Button
                  onClick={() => navigate("/login")}
                  className="bg-blue-400 rounded-full p-1"
                >
                  Inicia Sesion!
                </Disclosure.Button>

                <Disclosure.Button
                  onClick={() => navigate("/login")}
                  className="bg-secondary rounded-full p-1"
                >
                  Registrate
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          ) : (
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link to={item.href} key={item.name}>
                    <Disclosure.Button
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
};

export { Navbar };
