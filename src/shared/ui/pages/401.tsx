import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WordingErrors } from "@/api/errors";

const UnauthorizedPage = () => {
  return (
    <main className="flex h-lvh w-lvw flex-col items-center justify-between space-y-5 bg-gray-50">
      <section
        className="relative w-full min-h-[300px] p-5 pt-20 pb-0 overflow-hidden"
        style={{
          background: `radial-gradient(#FFFFFF, #A8D5FF)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Image
          src="/images/error-ilustration-6.svg"
          alt="Localoka Error Unauthorized"
          className="h-full w-full absolute -bottom-5 left-0"
          width={550}
          height={550}
        />
      </section>
      <div className="p-5 h-full flex flex-col justify-between">
        <section className="space-y-5 md:max-w-xl">
          <Image
            src="/images/localoka-logo.svg"
            alt="Localoka"
            width={100}
            height={100}
          />
          <h2
            data-testid="unauthorized-error-title"
            className="text-3xl font-semibold"
          >
            {WordingErrors.UNAUTHORIZED}
          </h2>
          <p className="text-left text-lg">
            Silakan coba beberapa saat lagi atau hubungi tim dukungan kami jika
            masalah berlanjut.
          </p>
        </section>
        <Link
          href="/"
          className="bg-primary self-end text-white p-3.5 font-semibold w-full rounded-lg text-center"
        >
          Coba Lagi
        </Link>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
