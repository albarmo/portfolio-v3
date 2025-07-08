"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface I_PropsSharedErrorScreen {
  type: string;
  title: string;
  message: string;
}

const ScreenError = ({ error }: { error: I_PropsSharedErrorScreen }) => {
  const router = useRouter();
  const [loaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-max w-lvw flex-col items-center justify-between space-y-5 bg-gray-50">
      <section className="flex flex-col justify-center items-center w-full h-min p-10">
        <Image
          src="/images/localoka-logo.svg"
          alt="Localoka"
          width={100}
          height={100}
        />
        <Image
          src="/images/assets/yellow-cart.webp"
          alt="Localoka Cart"
          width={230}
          height={230}
          className={`${
            loaded ? "grayscale" : "grayscale-0"
          } transition-all transform-gpu delay-300 duration-1000`}
        />
      </section>
      <div className="p-5 h-full flex flex-col justify-between">
        <section className="flex flex-col items-center justify-center space-y-5 md:max-w-[596px]">
          <h1 className="text-2xl font-semibold">
            {error.title || "Oops! Terjadi kesalahan. Silakan coba lagi nanti."}
            ,
          </h1>
          <p className="text-left text-lg">{error?.message}</p>
        </section>
        <button
          onClick={() => router.back()}
          className="bg-primary self-end text-white p-3.5 font-semibold w-full mt-5 rounded-lg"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default ScreenError;
