import creacion from "../assets/creacion-proyecto.svg";
import organizate from "../assets/organizate.svg";
import social from "../assets/social.svg";
export const InformationBar = () => {
  return (
    <div className="absolute w-2/3 h-36 bg-white gap-4 bottom-0 flex  pt-2 pl-12">
      <div className="w-24 h-full lg:w-64   ">
        <img src={creacion} alt="xd" />
        <h3 className="text-black font-bold">Creacion de proyectos </h3>
        <p className="text-sm">
          Crea proyectos con tus compaleros en la universidad
        </p>
      </div>
      <div className="w-24 h-full lg:w-64  ">
        <img src={social} alt="xd" />
        <h3 className="text-black font-bold">Conecta compañeros </h3>
        <p className="text-sm">
          Haz una agrupacion con los compañeros cpon los mismos intereses
        </p>
      </div>
      <div className="w-24 h-full lg:w-64  ">
        <img src={organizate} alt="xd" />
        <h3 className="text-black font-bold">Organizate </h3>
        <p className="text-sm">Organiza los proyectos con tu agrupacion</p>
      </div>
    </div>
  );
};
