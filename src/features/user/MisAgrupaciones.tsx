import Card from "../../ui/Card"
import * as firebase from "../../firebase/firebase";
import * as firestore from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { Key } from "react";
import { getAgrupacionesEstudiantiles } from "../../api/Agrupaciones";


export const MisAgrupaciones = () => {

  const dataUser = getAuth().currentUser;
  //retornar las agrupaciones a las que pertenece el usuario
  
 const agrupaciones = await getAgrupacionesEstudiantiles();

  
  
  
  return (
    <div className="mt-5 w-screen h-screen">
      <h1 className="text-3xl font-bold text-center text-orange-400">Mis Agrupaciones</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {agrupaciones.map((agrupacion: any) => (
          <Card
            key={agrupacion.id}
            id={agrupacion.id}
            foto_agrupacion={agrupacion.foto_agrupacion}
            mision={agrupacion.mision}
            tag={agrupacion.tag}
            nombre_agrupacion={agrupacion.nombre_agrupacion}
          />
        ))}
      </div>
    </div>
  )
}
