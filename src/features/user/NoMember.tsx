import { Link } from "react-router-dom";
import { Group } from "../../ui/Group";

export const NoMember = () => {
  return (
    <div>
      <div className="flex lg:flex-row flex-col  h-screen w-auto justify-center 2xl:mt-32 lg:mt-24 lg:px-32 px-6 2xl:px-72">
        <img
          src="https://images.pexels.com/photos/609771/pexels-photo-609771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="2xl:h-[26rem] 2xl:w-[28rem]  lg:h-[22rem] lg:w-[28rem] rounded-xl lg:mb-0 mb-5  "
        />

        <div className="flex flex-col  gap-6 ml-5 lg:pt-10">
          <div className="bg-primary w-10 h-10 rounded-xl lg:flex justify-center items-center hidden ">
            <Group />
          </div>
          <h2 className="text-4xl  lg:block hidden  ">
            No eres miembro de ninguna <br /> agrupacion{" "}
            <span className="text-primary font-bold "> !Unete! </span>
          </h2>
          <h2 className="text-3xl lg:hidden text-center  ">
            No eres miembro de ninguna agrupacion{" "}
            <span className="text-primary font-bold">Unete!</span>
          </h2>

          <p>
            Unete a una agrupacion para poder tener una aprendizaje integro,
            compartas personas con los mismos conocimienos y mucho mas. la
            universideas
          </p>
          <Link
            to="/buscar-agrupaciones"
            className="bg-secondary rounded-3xl text-center flex items-center justify-center text-white font-semibold h-12 w-40 2xl:mt-12"
          >
            {" "}
            Ver agrupaciones{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};
