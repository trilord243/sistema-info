import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <main className="relative isolate min-h-full h-screen w-screen">
        <img
          src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base font-semibold leading-8 text-secondary">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl text-primary">
            Pagina no encontrada
          </h1>
          <p className="mt-4 text-base text-white/70 sm:mt-6">
            El link que seguiste es incorrecto o la pagina ha sido removida.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              to="/"
              className="text-lg font-semibold leading-7 text-secondary text"
            >
              <span className="text-lg" aria-hidden="true">
                &larr;
              </span>{" "}
              Devolverse pagina inicio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
