import { TextButtonContainer } from "./TextButtonContainer";
import { InformationBar } from "./InformationBar";
import { HeroImage } from "./HeroImage";
import image from "../assets/group.png";
import { Link } from "react-router-dom";
import Loader from "../../ui/loader/Loader";
const MainPageComponent = () => {
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
            <br /> dolor sit amet consectetur.
            <br /> netus egestas
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl">
            Lorem ipsum dolor sit amet consectetur. Ut faucibus curabitur metus
            sit eget convallis ridiculus nunc. Sclerisque egestas vitae eget
            est.
          </p>
          <Link
            to="/register"
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Regístrate!! <span>&#10132;</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainPageComponent;
