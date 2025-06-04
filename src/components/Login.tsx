"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../lib/api/user";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;

    const data = {
      email: target.email.value.trim(),
      password: target.password.value.trim(),
    };
    console.log(data);
    try {
      const login = await loginUser(data);
      if (login.success) {
        setCookie("tokenAccess", login.token, { maxAge: 3000 });
        toast.success("Logeada con éxito. Hola Agus!");
        console.log(login);
        router.push("/dashboard");
        return;
      }
      //toast.error("Los datos ingresados no son correctos...");
    } catch (error) {
      console.log("error:", error);
      toast.error("Los datos ingresados no son correctos...");
    }
  };

  return (
    <section className="bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
        <span className="flex items-center text-3xl md:text-7xl font-alfa text-white uppercase mb-10 cursor-default text-shadow-blue-300 text-shadow-lg">
          La Stickeria App
        </span>
        <div className="w-full rounded-lg shadow-2xl shadow-blue-900 dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl leading-tight tracking-wider md:text-2xl text-white text-center font-mono">
              Ingresa con tu cuenta
            </h1>
            <form onSubmit={onSubmitForm} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-bold text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-2 text-white cursor-pointer"
                    title="Mostrar/ocultar contraseña"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </span>
                </div>
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 font-bold dark:text-gray-300"
                    >
                      Recordar datos
                    </label>
                  </div>
                </div>
              </div> */}
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md px-5 my-2 py-2 text-center w-full font-mono cursor-pointer"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
