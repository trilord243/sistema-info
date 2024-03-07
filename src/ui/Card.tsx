interface CardProps {
  foto_agrupacion: string;
  mision: string;
  tag: string;
  nombre_agrupacion: string;
}

const Card: React.FC<CardProps> = ({
  foto_agrupacion,
  mision,

  nombre_agrupacion,
}) => {
  return (
    <div className="card w-80   bg-white shadow-2xl">
      <figure className="h-48 p-4 ">
        <img
          className="w-full h-full rounded-2xl object-cover shadow-lg"
          src={foto_agrupacion}
          alt={nombre_agrupacion}
        />
      </figure>

      <div className="card-body p-3">
        <h2 className="text-black text-2xl text-center font-semibold">
          {nombre_agrupacion}
        </h2>

        <p className="text-sm line-clamp-3 text-black mb-3 mt-2">{mision}</p>
        <div className="flex justify-center ">
          <button
            type="button"
            className="rounded-md bg-orange-600 px-2 py-1 mb-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Mas informacion
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
