import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getAgrupacionById } from "../../api/Agrupaciones";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
// import { PayPalButtons } from "@paypal/react-paypal-js";
import * as firebase from "../../firebase/firebase";
import * as firestore from "firebase/firestore";

const userC = getAuth().currentUser;

export interface Agrupacion {
  id: string;
  estudiantes_registradors: string[];
  foto_agrupacion: string;
  mision: string;
  nombre_agrupacion: string;
  redes_sociales: string[];
  vision: string;
  tag: string;
  puntuacion: number;
  fecha_creacion: string;
}

export default function AgrupacionPage() {
  const [registered, setRegistered] = useState(false);

  const data = useLoaderData() as Agrupacion;

  useEffect(() => {
    fetchUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async () => {
    try {
      const querySnapshot = await firestore.getDocs(
        firestore.collection(firebase.db, "estudiantes")
      );
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.email == userC?.email) {
          if (user.agrupaciones.includes(data.id)) {
            console.log("Ya estas en esta agrupacion");
            setRegistered(true);
            return;
          } else {
            user.agrupaciones = [...user.agrupaciones, data.id];
            firestore.updateDoc(firestore.doc(firebase.db, "estudiantes", doc.id), user);
            console.log("Te has unido a la agrupacion");
            setRegistered(true);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlejoin = () => {
    fetchUser();
  };

  return (
    <div className="overflow-hidden bg-white py-32">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {data.nombre_agrupacion}
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              {data.mision}
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {data.vision}
            </p>

            {registered ? (
              <div
                className="mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
                role="alert"
              >
                <p className="font-bold">Te has unido a la agrupacion</p>

                {/* <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      application_context: {
                        brand_name: "Agrupaciones",
                        return_url: "http://localhost:3000/", // Change 'returnUrl' to 'return_url'
                      },
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: "1.00",
                          },
                        },
                      ],
                    });
                  }}
                /> */}
              </div>
            ) : (
              <div className="mt-10 flex">
                <a
                  onClick={handlejoin}
                  href="#"
                  className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Unete
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            )}

            {/* <PayPalButtons
              style={{ layout: "horizontal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  applicationContext: {
                    brandName: "Agrupaciones",
                    returnUrl: "http://localhost:3000/",
                  },
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD", // Add the missing currency_code property
                        value: "1.00",
                      },
                    },
                  ],
                  console.log(data);
                });
              }}
            /> */}
          </div>
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <img
                src={data.foto_agrupacion}
                alt=""
                className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    if (typeof params.id === "string") {
      const agrupacion = await getAgrupacionById(params.id);
      return agrupacion;
    }
  } catch (error) {
    console.log(error);
  }
}
