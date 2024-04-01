import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { StarRating } from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import {
  getPuntuados,
  getUserId,
  updatePuntuados,
} from "../features/user/userSlice";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  agrupacion: string;
}
interface AgrupacionData {
  puntuaciones: number[];
}

export default function Modal({ open, setOpen, agrupacion }: ModalProps) {
  const userId = useSelector(getUserId);
  const puntuados = useSelector(getPuntuados) || [];
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  const [rating, setRating] = useState(0);

  const handleSetRating = (newRating: number) => {
    setRating(newRating);
  };

  const handlePuntuar = async () => {
    const agrupacionRef = doc(db, "agrupaciones_estudiantiles", agrupacion);

    try {
      // Obtener el documento actual de la agrupación
      const agrupacionDoc = await getDoc(agrupacionRef);
      let agrupacionData = agrupacionDoc.data() as AgrupacionData;
      if (!agrupacionData || !agrupacionData.puntuaciones) {
        agrupacionData = { puntuaciones: [] };
      }

      // Agregar la nueva puntuación al array de puntuaciones
      const nuevasPuntuaciones = [...agrupacionData.puntuaciones, rating];

      // Calcular el promedio de las puntuaciones
      const promedioPuntuacion =
        nuevasPuntuaciones.reduce((acc, curr) => acc + curr, 0) /
        nuevasPuntuaciones.length;

      // Actualizar el documento de la agrupación con las nuevas puntuaciones y el promedio
      await updateDoc(agrupacionRef, {
        puntuaciones: nuevasPuntuaciones,
        puntuacion: promedioPuntuacion,
      });

      // Actualizar el documento del estudiante para reflejar que ha puntuado esta agrupación
      const estudianteRef = doc(db, "estudiantes", userId);
      await updateDoc(estudianteRef, {
        puntuados: arrayUnion(agrupacion),
      });

      // Actualizar el estado local
      const array = [...puntuados, agrupacion];
      dispatch(updatePuntuados(array));

      setOpen(false);
    } catch (error) {
      console.error("Error al puntuar la agrupación:", error);
    }
  };

  useEffect(() => {
    setRating(0);
  }, [agrupacion]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/sistema-info-d52b6.appspot.com/o/Illustration.svg?alt=media&token=975e390e-1728-4811-9930-f6225c929172"
                      alt="icon"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold  leading-6 text-gray-900"
                    >
                      Puntua la agrupacion de 1 a 4 eugenios
                    </Dialog.Title>
                    <div className="mt-2  flex justify-center">
                      <StarRating
                        maxRating={5}
                        size={70}
                        onsetRating={handleSetRating}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={handlePuntuar}
                  >
                    Puntuar
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
