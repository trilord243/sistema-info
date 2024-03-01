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
  if (nombre_agrupacion === "UNIMET Fitness") {
    console.log(mision);
  }
  return (
    <div className="w-[326px] h-[380px] bg-white rounded-2xl flex flex-col items-center p-6 shadow-xl shadow-gray-500/50">
      <img
        className="w-full h-40 object-cover rounded-t-2xl"
        src={foto_agrupacion}
        alt="Descripción de la imagen"
      />

      <div>EUGENIO</div>
      <h3 className="text-2xl font-bold mt-2 text-center ">
        {nombre_agrupacion}
      </h3>

      <div className="w-full h-20 overflow-hidden mt-2">
        <p className="text-sm break-words overflow-ellipsis text-center">
          {mision}
        </p>
      </div>

      <div
        className="flex gap-8 mt-3 bg-orange-50
      "
      >
        <h4 className="text-secondary">Más información</h4>
        <div className="text-lg text-secondary">&#10132;</div>
      </div>
    </div>
  );
};
export default Card;
