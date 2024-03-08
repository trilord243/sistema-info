import { NavLink } from "react-router-dom";

export const MobileNavbar = () => {
  return (
    <div className="btm-nav bg-white flex justify-between border-t border-b border-gray-200 md:hidden">
      <NavLink
        to="administrar-agrupaciones"
        className="flex flex-col items-center justify-center px-2 py-1 border-r bg-white border-gray-200"
      >
        {({ isActive }) => (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isActive ? "#253A80" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#253A80"
              className="w-6 h-6 transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>

            <span className="btm-nav-label">Agrupaciones</span>
          </>
        )}
      </NavLink>

      <NavLink
        to="crear-agrupacion"
        className="flex flex-col items-center justify-center px-2 py-1 border-r bg-white border-gray-200"
      >
        {({ isActive }) => (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isActive ? "#253A80" : "grey"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-7 h-7 transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span className="btm-nav-label text-[13px] text-primary">
              Crear agrupacion
            </span>
          </>
        )}
      </NavLink>
      <NavLink
        to="ver-usuario"
        className="flex flex-col items-center justify-center px-2 py-1 border-r bg-white border-gray-200"
      >
        {({ isActive }) => (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isActive ? "#253A80" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#253A80"
              className="w-6 h-6  transition-colors duration-300 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>

            <span className="btm-nav-label">Ver usuario</span>
          </>
        )}
      </NavLink>
    </div>
  );
};
