import svg from "../features/assets/Group.svg";
function ProfileUI() {
  return (
    <div className="flex flex-col h-full mt-6 gap-4 justify-center items-center px-7 mr-6  ">
      <h3 className="text-2xl font-semibold">Perfil </h3>
      <p className="text-sm text-gray-500">Rellene su información personal </p>
      <img
        src={svg}
        alt="Profile"
        className="lg:w-96 lg:h-w-96 mt- lg:block h-56 hidden"
      />
    </div>
  );
}

export default ProfileUI;
