import { useSelector } from "react-redux";
import {
  getBannerImage,
  getUserApellido,
  getUserImagenPerfil,
  getUserName,
} from "./userSlice";
import { useEffect, useState } from "react";

export default function ProfileBannerPhoto() {
  const name = useSelector(getUserName);
  const bannerImage = useSelector(getUserImagenPerfil);
  const profileImage = useSelector(getBannerImage);
  const apellido = useSelector(getUserApellido);
  const [napellido, setnapellido] = useState(apellido);

  useEffect(() => {
    name === apellido ? setnapellido("") : setnapellido(apellido);
    console.log(name === apellido);
  }, [name, apellido]);

  return (
    <div>
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48"
          src={profileImage}
          alt=""
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full sm:h-32 sm:w-32"
              src={bannerImage}
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {name} {napellido}
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900"></h1>
        </div>
      </div>
    </div>
  );
}
