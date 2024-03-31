import { useSelector } from "react-redux";
import { NoMember } from "./NoMember";
import { getUserAgrupaciones } from "./userSlice";

export const MisAgrupaciones = () => {
  const miembros = useSelector(getUserAgrupaciones);
  console.log(miembros);

  return <NoMember />;
};
