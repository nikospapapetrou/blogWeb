"use client"; // Error components must be Client Components
import Image from "next/image";
import warning from "../public/img/warning.svg";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col justify-center items-center pt-32 sm:pt-24">
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={warning}
        alt="Something went wrong"
        className="w-3/5 h-auto sm:w-36"
      />
      <h2 className="text-[#7897A3] mt-6 font-bold text-lg md:font-extrabold md:text-4xl md:tracking-wide">
        Κάτι πήγε λάθος
      </h2>
      <button
        className="mt-4 bg-lime-600 hover:bg-lime-400 p-2 rounded-sm text-white"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Προσπαθήστε ξανά
      </button>
    </main>
  );
}
