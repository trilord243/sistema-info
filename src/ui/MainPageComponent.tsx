import image from "../assets/group.png";

const MainPageComponent = () => {
  return (
    <>
      {/* Desktop  */}
      <div className="hidden lg:flex w-full h-[52rem]">
        <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left p-12 space-y-6 bg-primary text-white md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            ¡Únete!
            <br /> dolor sit amet consectetur.
            <br /> netus egestas
          </h1>
          <p className="text-lg md:text-xl">
            Lorem ipsum dolor sit amet consectetur. Ut faucibus curabitur metus
            sit eget convallis ridiculus nunc. Scelerisque egestas vitae eget
            est.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Regístrate!
          </button>
        </div>

        <div
          className="md:w-1/2 w-full h-1/2 md:h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      {/* Mobile and Tablet - visible on small and medium screens */}
      <div className="relative lg:hidden w-full h-[60vh] md:h-[75vh]">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={image}
            alt="Grupo de personas trabajando juntas"
            className="w-full h-full object-cover"
          />
          {/* Overlay with opacity */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
        {/* Text and button overlay */}
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
            Regístrate!
          </button>
        </div>
      </div>
    </>
  );
};

export default MainPageComponent;
