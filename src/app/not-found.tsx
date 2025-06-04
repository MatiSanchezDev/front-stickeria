import { ButtonNotFound } from "@/components/ButtonNotFound";

export default function NotFound() {
  return (
    <section className="bg-gray-900 h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-blue-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-alfa md:text-4xl text-white">
            Algo salió mal.
          </p>
          <p className="mb-4 text-lg font-mono text-gray-500 dark:text-gray-400">
            Lo sentimos, pero algo salió mal. <br /> Por favor vuelva a ingresar
            nuevamente. En caso de que siga el problema contactar con soporte.
          </p>
          <ButtonNotFound />
        </div>
      </div>
    </section>
  );
}
