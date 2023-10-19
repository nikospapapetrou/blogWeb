import Image from "next/image";
import Articles from "./components/Articles";
import History from "./components/History";
import garry from "../../public/img/garry.svg";
import { getDictionary } from "@/lib/dictionary";

export default async function Home({ params }) {
  const { page } = await getDictionary(params.lang);
  return (
    <>
      <main className="pt-16 sm:pt-24 px-4">
        <h2 className="pt-8 font-literata text-2xl text-center sm:text-3xl md:text-4xl font-medium text-mdblue tracking-wide mb-2 sm:mb-4">
          {page.home.h1}
        </h2>
        <div className="grid md:grid-cols-2 gap-9 text-black justify-center mx-auto w-full md:max-w-5xl h-full">
          <History page={page} locale={params.lang} />
        </div>

        <h2 className="pt-10 sm:pb-10 font-literata text-center text-2xl sm:text-3xl md:text-4xl font-medium text-mdblue tracking-wide mb-2 sm:mb-4">
          {page.home.h2}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 text-black justify-center mx-auto max-w-full md:max-w-5xl h-full">
          <Articles locale={params.lang} />
        </div>
      </main>

      <figure
        className="flex justify-center bg-[#F8ECC2] mt-8 py-10"
        aria-label={page.home.label}
      >
        <Image src={garry} alt="garry" />
      </figure>
    </>
  );
}
