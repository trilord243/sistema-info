import Card from "./Card";
import MainPageComponent from "./MainPageComponent";

const HomePage: React.FC = () => {
  return (
    <>
      <MainPageComponent />
      <div className="w-full lg:mt-32 mt-12">
        <h3 className="text-center lg:text-6xl text-3xl   ">
          <span className="font-bold"> CONOZCA NUESTRAS </span> <br />
          <span className="text-primary font-medium">AGRUPACIONES</span>
        </h3>
      </div>

      <div className="container mx-auto mt-10 p-7">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-x justify-items-center">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};

export default HomePage;
