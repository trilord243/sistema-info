import image from "../assets/group.png";
import creacion from "../assets/creacion-proyecto.svg";
import organizate from "../assets/organizate.svg";
import social from "../assets/social.svg";

const MainPageComponent = () => {
  return (
    <>
      {/* Desktop  */}
      <div className="hidden lg:flex w-full h-[52rem] relative">
        <div className="flex flex-col items-center text-center md:items-start md:text-left px-14 space-y-6 bg-primary text-white md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-10">
            <span className="text-secondary">¡Únete!</span>
            <br /> dolor sit amet consectetur.
            <br /> netus egestas
          </h1>
          <p className="text-lg md:text-xl">
            Lorem ipsum dolor sit amet consectetur. Ut faucibus curabitur metus
            sit eget convallis ridiculus nunc. Scelerisque egestas vitae eget
            est.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-5 rounded transition duration-300 ">
            Regístrate! <span className="ml-4">&#10132;</span>
          </button>
        </div>

        <div
          className="md:w-1/2 w-full h-1/2 md:h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute w-2/3 h-36 bg-white gap-4 bottom-0 flex  py-7 pl-12">
          <div className="w-24 h-full lg:w-64  ">
            <img src={creacion} alt="xd" />
            <h3 className="text- font-bold">Creacion de proyectos </h3>
            <p className="text-sm">
              Crea proyectos con tus compaleros en la universidad
            </p>
          </div>
          <div className="w-24 h-full lg:w-64  ">
            <img src={social} alt="xd" />
            <h3 className="text- font-bold">Conecta compañeros </h3>
            <p className="text-sm">
              Haz una agrupacion con los compañeros cpon los mismos intereses
            </p>
          </div>
          <div className="w-24 h-full lg:w-64  ">
            <img src={organizate} alt="xd" />
            <h3 className="text- font-bold">Organizate </h3>
            <p className="text-sm">Organiza los proyectos con tu agrupacion</p>
          </div>
        </div>
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
          <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Regístrate!! <span>&#10132;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MainPageComponent;
