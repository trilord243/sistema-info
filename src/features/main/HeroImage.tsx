import image from "../assets/group.png";
export const HeroImage = () => {
  return (
    <div
      className="md:w-1/2 w-full h-1/2 md:h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};
