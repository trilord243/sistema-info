const Card: React.FC = () => {
  return (
    <div className="w-[326px] h-[430px] bg-white rounded-2xl flex flex-col items-center p-6 shadow-xl shadow-gray-500/50">
      <img
        className="w-full h-auto object-cover rounded-t-2xl"
        src="https://www.lapatilla.com/wp-content/uploads/2018/09/Grupal-MetroMUN.jpg"
        alt="Descripción de la imagen"
      />
      <h3 className="text-2xl font-bold mt-2 text-center ">MetroMun</h3>

      <h5>//.....................EUGENIOS................//</h5>

      <div className="w-full h-20 overflow-hidden mt-2">
        <p className="text-sm  break-words overflow-ellipsis text-center">
          Este es un texto muy largo que será recortado y terminará con puntos
          suspensivos si excede el espacio disponible dentro de este contenedor.
          Puedes ajustar el texto aquí según sea necesario. Si el texto es
          demasiado largo para el espacio vertical disponible, se cortará.
        </p>
      </div>

      <div className="flex gap-7  mt-3">
        <h4 className=""> Mas informacion</h4>
        <div>&#10132;</div>
      </div>
    </div>
  );
};

export default Card;
