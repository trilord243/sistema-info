import Card from "../../ui/Card";
import Carousel from "./Carrousel";
import MainPageComponent from "./MainPageComponent";

const imageUrls = [
  "https://images.pexels.com/photos/106152/euro-coins-currency-money-106152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/256643/pexels-photo-256643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/106152/euro-coins-currency-money-106152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const HomePage: React.FC = () => {
  return (
    <>
      <MainPageComponent />
      <div className="w-full lg:mt-32 mt-12">
        <h3 className="text-center lg:text-6xl text-3xl   ">
          <span className="font-bold text-black"> CONOZCA NUESTRAS </span>{" "}
          <br />
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

      <div>
        <h4 className="text-center mt-10 text-6xl text-primary font-semibold ">
          NOTICIAS
        </h4>
      </div>
    </>
  );
};

export default HomePage;
