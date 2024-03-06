export default function CardAgrupacionAdmin() {
  return (
    <div className="card w-72  shadow-xl">
      <figure className="h-48">
        <img
          className="w-full h-full object-cover" // Asegura que la imagen cubra proporcionalmente
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>

      <div className="card-body p-3">
        <div className="flex gap-4">
          <div>
            <p className="text-primary font-semibold">Tecnlogia</p>
          </div>

          {false && (
            <div>
              {" "}
              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                <svg
                  className="h-1.5 w-1.5 fill-red-500"
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx={3} cy={3} r={3} />
                </svg>
                Badge
              </span>
            </div>
          )}
        </div>
        <div className="flex w-full  justify-between">
          <div>
            <h2 className="text-black font-semibold">Metrotech</h2>
          </div>

          <div>
            <span className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              <svg
                className="h-1.5 w-1.5 fill-blue-500"
                viewBox="0 0 6 6"
                aria-hidden="true"
              >
                <circle cx={3} cy={3} r={3} />
              </svg>
              Badge
            </span>
          </div>
        </div>

        <p className="text-sm line-clamp-3 text-black mb-3 mt-5">
          The World Before the Flood (en español: El mundo antes del diluvio) es
          un óleo sobre lienzo del artista inglés William Etty, expuesto por
          primera vez en 1828 y a 2022 en la Galería de Arte de la ciudad de
          Southampton. Representa una escena de El paraíso perdido de John
          Milton en la que, entre una serie de visiones del futuro mostradas a
          Adán, ve el mundo inmediatamente antes de la gran inundación. La
          pintura ilustra las etapas del cortejo descritas por Milton: un grupo
          de hombres elige esposa entre un grupo de bailarinas, arrastra a la
          mujer elegida del grupo y se instala en la vida matrimonial. Detrás
          del grupo de cortejo se avecina una tormenta que presagia la
          destrucción que los bailarines y amantes están a punto de acarrearse.
        </p>
        <div className="flex justify-between my-4 ">
          <button
            type="button"
            className="rounded-md bg-blue-600 px-2 py-1  text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Ver miembros
          </button>{" "}
          <button
            type="button"
            className="rounded-md bg-green-600 px-2 py-1  text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Actualizar datos
          </button>
        </div>
      </div>
    </div>
  );
}
