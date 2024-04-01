import { TextButtonContainer } from "./TextButtonContainer";
import { InformationBar } from "./InformationBar";
import { HeroImage } from "./HeroImage";
import image from "../assets/group.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLogged } from "../admin/adminSlice";
import { getUserLogin } from "../user/userSlice";

const MainPageComponent = () => {
  const admin = useSelector(getIsLogged);
  const estudiante = useSelector(getUserLogin);

  const isLogged = admin || estudiante;
  const isStudiante = estudiante;
  return (
    <>
      {/* Desktop  */}
      <div className="hidden lg:flex w-full h-[55rem] relative">
        <TextButtonContainer />
        <HeroImage />
        <InformationBar />
      </div>
      {/* Mobile  */}
      <div className="relative lg:hidden w-full h-[60vh] md:h-[75vh]">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={image}
            alt="Grupo de personas trabajando juntas"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            <span className="text-secondary"> ¡Únete!</span>
            <br /> Universidad.
            <br />
            Metropolitana
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl">
            La bandera de la Universidad Metropolitana tiene como fondo el color
            blanco y en el centro el logo de la institución.
            <br />
            Las franjas color naranja simbolizan el ondear de la enseñanza y la
            sabiduría.
          </p>

          {!isLogged ? (
            <Link
              to="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-5 rounded-xl transition duration-300 mt-6 "
            >
              Regístrate! <span className="ml-4">&#10132;</span>
            </Link>
          ) : isStudiante ? (
            <Link
              to="/buscar-agrupaciones"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-5 rounded-xl transition duration-300 mt-6 "
            >
              Busca agrupaciones! <span className="ml-4">&#10132;</span>
            </Link>
          ) : (
            <Link
              to="/administrar-agrupaciones"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-5 rounded-xl transition duration-300 mt-6 "
            >
              Administrar agrupaciones <span className="ml-4">&#10132;</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPageComponent;
