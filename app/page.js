import Image from "next/image";
import filiki from "../public/img/filiki_etaireia.svg";
import Articles from "./components/Articles";
import History from "./components/History";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center pt-16 sm:pt-24 px-4">
        <h2 className="pt-8 font-literata text-xl sm:text-2xl md:text-4xl font-medium text-mdblue tracking-wide mb-2 sm:mb-4">
          Ιστορία
        </h2>
        <div className="flex flex-col items-center text-black sm:flex-row sm:flex-wrap sm:justify-center md:max-w-5xl">
          <History />
        </div>

        <h2 className="pt-10 font-literata text-xl sm:text-2xl md:text-4xl font-medium text-mdblue tracking-wide mb-2 sm:mb-4">
          Άρθρα
        </h2>
        <div className="flex flex-col items-center text-black sm:flex-row sm:flex-wrap sm:justify-center md:max-w-5xl">
          <Articles />
        </div>
      </main>

      <section
        className="flex justify-center bg-[#F8ECC2] mt-8 py-10"
        aria-label="Είναι μία εικόνα svg της φιλικής εταιρείας"
      >
        <Image src={filiki} alt="Φιλική Εταιρεία" />
      </section>
    </>
  );
}
