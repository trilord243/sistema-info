import MainPageComponent from "./MainPageComponent";

const HomePage: React.FC = () => {
  return (
    <>
      <MainPageComponent />
      <div className="w-full mt-32">
        <h3 className="text-center text-[64px] ">
          <span className="font-bold"> CONOZCA NUESTRAS </span> <br />
          <span className="text-primary font-medium">AGRUPACIONES</span>
        </h3>
      </div>
    </>
  );
};

export default HomePage;
