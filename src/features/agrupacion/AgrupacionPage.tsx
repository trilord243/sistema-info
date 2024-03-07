import { useParams } from "react-router-dom";

export const AgrupacionPage = () => {
  const { id } = useParams();

  console.log(id);
  return <div>AgrupacionPage</div>;
};
