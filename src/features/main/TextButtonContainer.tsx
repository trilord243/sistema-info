export const TextButtonContainer = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center md:items-start md:text-left px-14 space-y-6 bg-primary text-white md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-32">
          <span className="text-secondary">¡Únete!</span>
          <br /> dolor sit amet consectetur.
          <br /> netus egestas
        </h1>
        <p className="text-lg md:text-xl">
          Lorem ipsum dolor sit amet consectetur. Ut faucibus curabitur metus
          sit eget convallis ridiculus nunc. Scelerisque egestas vitae eget est.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-5 rounded transition duration-300 ">
          Regístrate! <span className="ml-4">&#10132;</span>
        </button>
      </div>
    </>
  );
};
